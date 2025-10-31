import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Все маршруты требуют аутентификации
router.use(authenticateToken);

/**
 * GET /api/users/profile
 * Получение профиля пользователя
 */
router.get('/profile', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, phone, first_name, last_name, middle_name, email, age, gender, phone_verified, created_at
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      phone: user.phone,
      firstName: user.first_name,
      lastName: user.last_name,
      middleName: user.middle_name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      phoneVerified: user.phone_verified,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ error: 'Ошибка получения профиля' });
  }
});

/**
 * PUT /api/users/profile
 * Обновление профиля пользователя
 */
router.put(
  '/profile',
  [
    body('firstName').optional().trim().isLength({ min: 2, max: 100 }),
    body('lastName').optional().trim().isLength({ min: 2, max: 100 }),
    body('middleName').optional().trim().isLength({ max: 100 }),
    body('email').optional().isEmail(),
    body('age').optional().isInt({ min: 14, max: 120 }),
    body('gender').optional().isIn(['male', 'female', 'other']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, middleName, email, age, gender } = req.body;
      
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (firstName !== undefined) {
        updates.push(`first_name = $${paramCount++}`);
        values.push(firstName);
      }
      if (lastName !== undefined) {
        updates.push(`last_name = $${paramCount++}`);
        values.push(lastName);
      }
      if (middleName !== undefined) {
        updates.push(`middle_name = $${paramCount++}`);
        values.push(middleName);
      }
      if (email !== undefined) {
        updates.push(`email = $${paramCount++}`);
        values.push(email);
      }
      if (age !== undefined) {
        updates.push(`age = $${paramCount++}`);
        values.push(age);
      }
      if (gender !== undefined) {
        updates.push(`gender = $${paramCount++}`);
        values.push(gender);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'Нет данных для обновления' });
      }

      values.push(req.user.userId);

      const result = await pool.query(
        `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
         WHERE id = $${paramCount}
         RETURNING id, phone, first_name, last_name, middle_name, email, age, gender`,
        values
      );

      const user = result.rows[0];
      res.json({
        id: user.id,
        phone: user.phone,
        firstName: user.first_name,
        lastName: user.last_name,
        middleName: user.middle_name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      });
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      res.status(500).json({ error: 'Ошибка обновления профиля' });
    }
  }
);

/**
 * GET /api/users/addresses
 * Получение всех адресов пользователя
 */
router.get('/addresses', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, city, street, building, apartment, postal_code, is_default, created_at
       FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC`,
      [req.user.userId]
    );

    res.json(
      result.rows.map((addr) => ({
        id: addr.id,
        title: addr.title,
        city: addr.city,
        street: addr.street,
        building: addr.building,
        apartment: addr.apartment,
        postalCode: addr.postal_code,
        isDefault: addr.is_default,
        createdAt: addr.created_at,
      }))
    );
  } catch (error) {
    console.error('Ошибка получения адресов:', error);
    res.status(500).json({ error: 'Ошибка получения адресов' });
  }
});

/**
 * POST /api/users/addresses
 * Добавление нового адреса
 */
router.post(
  '/addresses',
  [
    body('title').trim().isLength({ min: 1, max: 100 }),
    body('city').trim().isLength({ min: 1, max: 100 }),
    body('street').trim().isLength({ min: 1, max: 255 }),
    body('building').trim().isLength({ min: 1, max: 50 }),
    body('apartment').optional().trim().isLength({ max: 50 }),
    body('postalCode').optional().trim().isLength({ max: 20 }),
    body('isDefault').optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, city, street, building, apartment, postalCode, isDefault } = req.body;

      // Если это адрес по умолчанию, снимаем флаг с других адресов
      if (isDefault) {
        await pool.query(
          `UPDATE user_addresses SET is_default = false WHERE user_id = $1`,
          [req.user.userId]
        );
      }

      const result = await pool.query(
        `INSERT INTO user_addresses (user_id, title, city, street, building, apartment, postal_code, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, title, city, street, building, apartment, postal_code, is_default`,
        [req.user.userId, title, city, street, building, apartment || null, postalCode || null, isDefault || false]
      );

      res.status(201).json({
        id: result.rows[0].id,
        title: result.rows[0].title,
        city: result.rows[0].city,
        street: result.rows[0].street,
        building: result.rows[0].building,
        apartment: result.rows[0].apartment,
        postalCode: result.rows[0].postal_code,
        isDefault: result.rows[0].is_default,
      });
    } catch (error) {
      console.error('Ошибка добавления адреса:', error);
      res.status(500).json({ error: 'Ошибка добавления адреса' });
    }
  }
);

export default router;

