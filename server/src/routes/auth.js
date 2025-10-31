import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { sendSMSCode, generateSMSCode } from '../services/smsService.js';
import { generateToken } from '../middleware/auth.js';
import { normalizePhone, isValidPhone } from '../utils/phoneValidator.js';

const router = express.Router();

/**
 * POST /api/auth/send-code
 * Отправка SMS кода на номер телефона
 */
router.post(
  '/send-code',
  [
    body('phone')
      .notEmpty()
      .withMessage('Номер телефона обязателен')
      .custom((value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10 || cleaned.length > 11) {
          throw new Error('Неверный формат номера телефона');
        }
        return true;
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { phone } = req.body;
      
      // Нормализация номера телефона
      const formattedPhone = normalizePhone(phone);
      
      if (!formattedPhone) {
        return res.status(400).json({ 
          error: 'Неверный формат номера телефона. Используйте формат: +79991234567, 89991234567 или 79991234567' 
        });
      }

      console.log(`📞 Запрос на отправку кода для: ${formattedPhone}`);

      // Генерация кода
      const code = generateSMSCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

      // Сохранение кода в БД
      try {
        await pool.query(
          `INSERT INTO sms_codes (phone, code, expires_at) 
           VALUES ($1, $2, $3)`,
          [formattedPhone, code, expiresAt]
        );
        console.log(`✅ Код сохранен в БД для ${formattedPhone}`);
      } catch (dbError) {
        console.error('❌ Ошибка сохранения кода в БД:', dbError);
        return res.status(500).json({ error: 'Ошибка сохранения кода. Проверьте подключение к БД.' });
      }

      // Отправка SMS
      await sendSMSCode(formattedPhone, code);

      res.json({
        success: true,
        message: 'Код отправлен на ваш номер телефона',
        phone: formattedPhone,
      });
    } catch (error) {
      console.error('❌ Ошибка отправки кода:', error);
      res.status(500).json({ 
        error: 'Ошибка отправки кода',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

/**
 * POST /api/auth/verify-code
 * Проверка SMS кода и авторизация/регистрация
 */
router.post(
  '/verify-code',
  [
    body('phone').notEmpty().withMessage('Номер телефона обязателен'),
    body('code').isLength({ min: 6, max: 6 }).withMessage('Код должен содержать 6 цифр').isNumeric().withMessage('Код должен содержать только цифры'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { phone, code } = req.body;
      
      // Нормализация номера телефона
      const formattedPhone = normalizePhone(phone);
      
      if (!formattedPhone) {
        return res.status(400).json({ 
          error: 'Неверный формат номера телефона' 
        });
      }

      console.log(`🔍 Проверка кода для: ${formattedPhone}, код: ${code}`);

      // Проверка кода
      const codeResult = await pool.query(
        `SELECT * FROM sms_codes 
         WHERE phone = $1 AND code = $2 AND expires_at > NOW() AND used = false
         ORDER BY created_at DESC LIMIT 1`,
        [formattedPhone, code]
      );

      if (codeResult.rows.length === 0) {
        return res.status(400).json({ error: 'Неверный или истекший код' });
      }

      // Отметка кода как использованного
      await pool.query(
        `UPDATE sms_codes SET used = true WHERE id = $1`,
        [codeResult.rows[0].id]
      );

      // Поиск пользователя
      const userResult = await pool.query(
        `SELECT * FROM users WHERE phone = $1`,
        [formattedPhone]
      );

      let userId;

      if (userResult.rows.length === 0) {
        // Пользователь не найден - нужна регистрация
        return res.json({
          success: true,
          requiresRegistration: true,
          phone: formattedPhone,
          message: 'Код подтвержден. Требуется регистрация.',
        });
      } else {
        // Пользователь найден - авторизация
        userId = userResult.rows[0].id;
        
        // Обновление статуса верификации телефона
        await pool.query(
          `UPDATE users SET phone_verified = true WHERE id = $1`,
          [userId]
        );

        const token = generateToken(userId);

        res.json({
          success: true,
          requiresRegistration: false,
          token,
          user: {
            id: userResult.rows[0].id,
            phone: userResult.rows[0].phone,
            firstName: userResult.rows[0].first_name,
            lastName: userResult.rows[0].last_name,
            email: userResult.rows[0].email,
          },
        });
      }
    } catch (error) {
      console.error('Ошибка верификации кода:', error);
      res.status(500).json({ error: 'Ошибка верификации кода' });
    }
  }
);

/**
 * POST /api/auth/register
 * Регистрация нового пользователя
 */
router.post(
  '/register',
  [
    body('phone').notEmpty().withMessage('Номер телефона обязателен'),
    body('code').isLength({ min: 6, max: 6 }).withMessage('Код должен содержать 6 цифр').isNumeric(),
    body('firstName').trim().isLength({ min: 2, max: 100 }).withMessage('Имя должно быть от 2 до 100 символов'),
    body('lastName').trim().isLength({ min: 2, max: 100 }).withMessage('Фамилия должна быть от 2 до 100 символов'),
    body('email').optional({ nullable: true, checkFalsy: true }).isEmail().withMessage('Неверный формат email'),
    body('age').optional({ nullable: true }).isInt({ min: 14, max: 120 }).withMessage('Возраст должен быть от 14 до 120'),
    body('gender').optional({ nullable: true }).isIn(['male', 'female', 'other']).withMessage('Неверное значение пола'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { phone, code, firstName, lastName, middleName, email, age, gender } = req.body;
      
      // Нормализация номера телефона
      const formattedPhone = normalizePhone(phone);
      
      if (!formattedPhone) {
        return res.status(400).json({ 
          error: 'Неверный формат номера телефона' 
        });
      }

      console.log(`📝 Регистрация пользователя: ${formattedPhone}`);

      // Проверка кода еще раз
      const codeResult = await pool.query(
        `SELECT * FROM sms_codes 
         WHERE phone = $1 AND code = $2 AND expires_at > NOW() AND used = false
         ORDER BY created_at DESC LIMIT 1`,
        [formattedPhone, code]
      );

      if (codeResult.rows.length === 0) {
        return res.status(400).json({ error: 'Неверный или истекший код' });
      }

      // Проверка, что пользователь еще не зарегистрирован
      const existingUser = await pool.query(
        `SELECT * FROM users WHERE phone = $1`,
        [formattedPhone]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Пользователь с таким номером уже существует' });
      }

      // Создание пользователя
      const userResult = await pool.query(
        `INSERT INTO users (phone, phone_verified, first_name, last_name, middle_name, email, age, gender)
         VALUES ($1, true, $2, $3, $4, $5, $6, $7)
         RETURNING id, phone, first_name, last_name, email`,
        [formattedPhone, firstName, lastName, middleName || null, email || null, age || null, gender || null]
      );

      // Отметка кода как использованного
      await pool.query(
        `UPDATE sms_codes SET used = true WHERE id = $1`,
        [codeResult.rows[0].id]
      );

      const user = userResult.rows[0];
      const token = generateToken(user.id);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user.id,
          phone: user.phone,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      res.status(500).json({ error: 'Ошибка регистрации' });
    }
  }
);

export default router;

