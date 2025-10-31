# Инструкция по настройке проекта Fashion Store

## 📋 Предварительные требования

- Node.js 18+ 
- PostgreSQL 12+
- npm или yarn

## 🗄️ Настройка базы данных PostgreSQL

### 1. Установка PostgreSQL

Если PostgreSQL еще не установлен:
- Windows: https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql`
- Linux: `sudo apt-get install postgresql`

### 2. Создание базы данных

```bash
# Войти в PostgreSQL (Windows - pgAdmin или командная строка)
psql -U postgres

# Создать базу данных
CREATE DATABASE fashion_store;

# Выйти
\q
```

### 3. Применение схемы

```bash
# Перейти в папку server
cd server

# Применить схему
psql -U postgres -d fashion_store -f database/schema.sql

# Заполнить начальными данными (опционально)
psql -U postgres -d fashion_store -f database/seed.sql
```

Или через pgAdmin:
1. Открыть pgAdmin
2. Подключиться к серверу
3. Правой кнопкой на Databases → Create → Database
4. Имя: `fashion_store`
5. Открыть Query Tool
6. Скопировать содержимое `database/schema.sql` и выполнить
7. То же самое с `database/seed.sql`

## 🔧 Настройка бэкенда

### 1. Установка зависимостей

```bash
cd server
npm install
```

### 2. Настройка переменных окружения

```bash
# Создать файл .env
cp .env.example .env

# Отредактировать .env
```

Пример `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fashion_store
DB_USER=postgres
DB_PASSWORD=ваш_пароль

PORT=5000
NODE_ENV=development

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000
```

### 3. Запуск сервера

```bash
npm run dev
```

Сервер будет доступен на `http://localhost:5000`

Проверка:
```bash
curl http://localhost:5000/api/health
```

## 🎨 Настройка фронтенда

### 1. Установка зависимостей

```bash
cd client
npm install
```

### 2. Настройка переменных окружения (опционально)

```bash
# Создать .env.local
cp .env.local.example .env.local
```

По умолчанию используется `http://localhost:5000/api`

### 3. Запуск фронтенда

```bash
npm run dev
```

Фронтенд будет доступен на `http://localhost:3000`

## 🧪 Тестирование авторизации

### 1. Открыть страницу авторизации

Перейти на `http://localhost:3000/auth`

### 2. Ввести номер телефона

Например: `79991234567`

### 3. Проверить консоль сервера

В режиме разработки SMS код будет выведен в консоль:
```
📱 SMS код для +79991234567: 123456
⏰ Код действителен 5 минут
```

### 4. Ввести код

Ввести 6-значный код из консоли

### 5. Регистрация (если пользователь новый)

Если пользователя нет в БД, откроется форма регистрации:
- Имя * (обязательно)
- Фамилия * (обязательно)
- Отчество (опционально)
- Email (опционально)
- Возраст (опционально)
- Пол (опционально)

### 6. Авторизация (если пользователь существует)

Если пользователь уже есть в БД, происходит автоматическая авторизация и переход в профиль.

## 📱 SMS в продакшене

Для продакшена нужно настроить реальный SMS API. Пример для sms.ru:

```javascript
// В server/src/services/smsService.js
const axios = require('axios');

export async function sendSMSCode(phone, code) {
  try {
    const response = await axios.get('https://sms.ru/sms/send', {
      params: {
        api_id: process.env.SMS_API_ID,
        to: phone,
        msg: `Ваш код подтверждения: ${code}`,
        json: 1
      }
    });
    return response.data.status === 'OK';
  } catch (error) {
    console.error('Ошибка отправки SMS:', error);
    return false;
  }
}
```

Добавить в `.env`:
```env
SMS_API_ID=your_sms_ru_api_id
```

## 🔍 Проверка работы

### Проверка БД

```bash
psql -U postgres -d fashion_store

# Проверить таблицы
\dt

# Проверить пользователей
SELECT * FROM users;

# Проверить адреса
SELECT * FROM user_addresses;

# Проверить SMS коды
SELECT * FROM sms_codes ORDER BY created_at DESC LIMIT 5;
```

### Проверка API

```bash
# Health check
curl http://localhost:5000/api/health

# Отправка SMS кода
curl -X POST http://localhost:5000/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"phone": "+79991234567"}'
```

## 🐛 Решение проблем

### Ошибка подключения к БД

1. Проверить, что PostgreSQL запущен
2. Проверить данные в `.env`
3. Проверить права доступа пользователя БД

### Ошибка "relation does not exist"

Таблицы не созданы. Применить схему:
```bash
psql -U postgres -d fashion_store -f database/schema.sql
```

### CORS ошибки

Проверить `CORS_ORIGIN` в `.env` сервера

### SMS код не приходит

В development режиме код выводится в консоль сервера, не в браузер!

## 📚 Структура проекта

```
IMD/
├── client/          # Next.js фронтенд
│   └── src/
│       └── app/
│           └── auth/    # Страница авторизации/регистрации
├── server/          # Express бэкенд
│   ├── database/   # SQL схемы
│   └── src/
│       ├── routes/  # API маршруты
│       └── services/ # SMS сервис
└── README.md
```

## ✅ Чеклист запуска

- [ ] PostgreSQL установлен и запущен
- [ ] База данных `fashion_store` создана
- [ ] Схема БД применена (`schema.sql`)
- [ ] Начальные данные загружены (`seed.sql`)
- [ ] `.env` файл создан и настроен
- [ ] Зависимости сервера установлены (`npm install`)
- [ ] Сервер запущен (`npm run dev`)
- [ ] Зависимости клиента установлены (`npm install`)
- [ ] Клиент запущен (`npm run dev`)
- [ ] Страница `/auth` открывается
- [ ] SMS код приходит (в консоль сервера)

---

Готово! Теперь можно тестировать авторизацию через SMS! 🎉

