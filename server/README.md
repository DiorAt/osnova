# Fashion Store - Backend

Бэкенд для интернет-магазина одежды на Node.js + Express + PostgreSQL.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- PostgreSQL 12+
- npm или yarn

### Установка

```bash
# Установка зависимостей
npm install

# Создание файла .env
cp .env.example .env

# Редактирование .env с вашими данными БД
```

### Настройка базы данных

```bash
# Создание базы данных
createdb fashion_store

# Применение схемы
psql -d fashion_store -f database/schema.sql

# Заполнение начальными данными (опционально)
psql -d fashion_store -f database/seed.sql
```

### Запуск

```bash
# Режим разработки (с автоперезагрузкой)
npm run dev

# Продакшн
npm start
```

Сервер будет доступен на `http://localhost:5000`

## 📁 Структура проекта

```
server/
├── src/
│   ├── config/          # Конфигурация (БД)
│   ├── middleware/       # Middleware (auth)
│   ├── routes/          # API маршруты
│   │   ├── auth.js      # Авторизация через SMS
│   │   └── users.js     # Профиль и адреса
│   ├── services/         # Сервисы (SMS)
│   └── index.js          # Точка входа
├── database/
│   ├── schema.sql        # Схема БД
│   └── seed.sql          # Начальные данные
└── package.json
```

## 🗄️ База данных

### Таблицы

- **categories** - Категории товаров
- **products** - Товары
- **promotions** - Акции
- **users** - Пользователи
- **user_addresses** - Адреса доставки пользователей
- **sms_codes** - SMS коды для авторизации

### Схема пользователя

```sql
users (
  id, phone, phone_verified,
  first_name, last_name, middle_name,
  email, age, gender,
  created_at, updated_at
)
```

### Схема адресов

```sql
user_addresses (
  id, user_id, title,
  city, street, building, apartment, postal_code,
  is_default, created_at, updated_at
)
```

## 📡 API Endpoints

### Авторизация

#### `POST /api/auth/send-code`
Отправка SMS кода на номер телефона

**Request:**
```json
{
  "phone": "+79991234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Код отправлен на ваш номер телефона",
  "phone": "+79991234567"
}
```

#### `POST /api/auth/verify-code`
Проверка SMS кода

**Request:**
```json
{
  "phone": "+79991234567",
  "code": "123456"
}
```

**Response (если пользователь существует):**
```json
{
  "success": true,
  "requiresRegistration": false,
  "token": "jwt_token_here",
  "user": { ... }
}
```

**Response (если нужна регистрация):**
```json
{
  "success": true,
  "requiresRegistration": true,
  "phone": "+79991234567",
  "message": "Код подтвержден. Требуется регистрация."
}
```

#### `POST /api/auth/register`
Регистрация нового пользователя

**Request:**
```json
{
  "phone": "+79991234567",
  "code": "123456",
  "firstName": "Иван",
  "lastName": "Иванов",
  "middleName": "Иванович",
  "email": "ivan@example.com",
  "age": 25,
  "gender": "male"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Пользователи (требует авторизации)

#### `GET /api/users/profile`
Получение профиля пользователя

**Headers:**
```
Authorization: Bearer <token>
```

#### `PUT /api/users/profile`
Обновление профиля

#### `GET /api/users/addresses`
Получение всех адресов пользователя

#### `POST /api/users/addresses`
Добавление нового адреса

**Request:**
```json
{
  "title": "Дом",
  "city": "Москва",
  "street": "ул. Ленина",
  "building": "1",
  "apartment": "45",
  "postalCode": "123456",
  "isDefault": true
}
```

## 🔐 Авторизация через SMS

1. Пользователь вводит номер телефона
2. Система отправляет SMS с 6-значным кодом
3. Пользователь вводит код
4. Если пользователь существует → авторизация
5. Если пользователя нет → переход на регистрацию
6. После регистрации → авторизация

## 📱 SMS Сервис

В режиме разработки SMS коды выводятся в консоль.
Для продакшена нужно настроить реальный SMS API (sms.ru, twilio и т.д.)

## 🔧 Переменные окружения

См. `.env.example`:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - настройки БД
- `PORT` - порт сервера (по умолчанию 5000)
- `JWT_SECRET` - секретный ключ для JWT
- `CORS_ORIGIN` - origin для CORS (по умолчанию http://localhost:3000)

## 🧪 Тестирование

```bash
# Проверка здоровья сервера
curl http://localhost:5000/api/health

# Отправка SMS кода
curl -X POST http://localhost:5000/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"phone": "+79991234567"}'
```

## 📝 Заметки

- SMS коды действительны 5 минут
- В development режиме коды выводятся в консоль
- JWT токены действительны 7 дней
- Номера телефонов нормализуются в формат +7XXXXXXXXXX

---

Made with ❤️ using Node.js + Express + PostgreSQL
