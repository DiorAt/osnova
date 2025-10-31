import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import pool from './config/database.js';

dotenv.config();

// Проверка обязательных переменных окружения
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET не установлен! Используется дефолтный ключ (небезопасно для продакшена)');
  process.env.JWT_SECRET = 'default_secret_key_change_in_production';
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Проверка подключения к БД
async function checkDatabase() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ База данных подключена:', result.rows[0].now);
    
    // Проверка существования таблиц
    const tablesCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'sms_codes', 'products', 'categories')
    `);
    
    console.log(`📊 Найдено таблиц: ${tablesCheck.rows.length}`);
    if (tablesCheck.rows.length < 4) {
      console.warn('⚠️  Не все таблицы созданы! Выполните: psql -d fashion_store -f database/schema.sql');
    }
  } catch (err) {
    console.error('❌ Ошибка подключения к БД:', err.message);
    console.error('💡 Проверьте:');
    console.error('   1. PostgreSQL запущен');
    console.error('   2. База данных fashion_store создана');
    console.error('   3. Пароль в .env правильный');
    console.error('   4. Таблицы созданы (schema.sql)');
  }
}

checkDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📡 API доступен по адресу http://localhost:${PORT}/api`);
});

