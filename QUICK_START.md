# 🚀 Быстрый старт - Проверка работы

## Шаг 1: Проверка PostgreSQL

```bash
# Проверить, что PostgreSQL запущен
# Windows: через Services или pgAdmin
# Mac/Linux: 
pg_isready

# Если не запущен:
# Windows: запустить службу PostgreSQL через Services
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

## Шаг 2: Создание БД (если еще не создана)

```bash
# Войти в PostgreSQL
psql -U postgres

# В psql выполнить:
CREATE DATABASE fashion_store;
\q

# Применить схему
psql -U postgres -d fashion_store -f server/database/schema.sql
```

## Шаг 3: Настройка .env

Создайте файл `server/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fashion_store
DB_USER=postgres
DB_PASSWORD=postgres

PORT=5000
NODE_ENV=development

JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000
```

## Шаг 4: Установка зависимостей сервера

```bash
cd server
npm install
```

## Шаг 5: Запуск сервера

```bash
npm run dev
```

**Должно появиться:**
```
✅ База данных подключена: ...
📊 Найдено таблиц: 6
🚀 Сервер запущен на порту 5000
```

Если видите ошибку подключения к БД - проверьте пароль в `.env`

## Шаг 6: Тестирование API

В другом терминале:

```bash
# Health check
curl http://localhost:5000/api/health

# Отправка SMS кода
curl -X POST http://localhost:5000/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d "{\"phone\":\"79991234567\"}"
```

**В консоли сервера должен появиться код:**
```
==================================================
📱 SMS КОД ДЛЯ +79991234567
==================================================
🔑 КОД: 123456
...
```

## Шаг 7: Запуск клиента

```bash
cd client
npm install
npm run dev
```

## Шаг 8: Тестирование авторизации

1. Откройте `http://localhost:3000/auth`
2. Введите номер: `79991234567` или `89991234567` или `+79991234567`
3. Нажмите "Получить код"
4. **Посмотрите в консоль сервера** - там будет код
5. Введите код
6. Если пользователя нет - заполните форму регистрации

## 🔧 Решение проблем

### Ошибка подключения к БД

```
❌ Ошибка подключения к БД: password authentication failed
```

**Решение:**
1. Проверьте пароль в `server/.env`
2. Попробуйте изменить пароль:
   ```bash
   psql -U postgres
   ALTER USER postgres WITH PASSWORD 'postgres';
   ```

### Таблицы не найдены

```
⚠️  Не все таблицы созданы!
```

**Решение:**
```bash
psql -U postgres -d fashion_store -f server/database/schema.sql
```

### CORS ошибка

Добавьте в `server/.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

### Порт занят

Измените порт в `server/.env`:
```env
PORT=5001
```

И в `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

Если все работает, вы увидите код в консоли сервера! 🎉

