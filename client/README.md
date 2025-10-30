# Fashion Store - Frontend (Next.js)

Фронтенд интернет-магазина одежды, построенный на **Next.js 14** с App Router.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Запуск production сервера
npm start
```

Приложение будет доступно по адресу: **http://localhost:3000**

## 📁 Структура (App Router)

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Корневой layout
│   ├── page.tsx            # Главная страница (/)
│   ├── products/           # Каталог товаров
│   ├── product/[id]/       # Динамическая страница товара
│   ├── profile/            # Личный кабинет
│   ├── promotions/         # Акции
│   ├── privacy-policy/     # Политика конфиденциальности
│   ├── terms/              # Условия использования
│   ├── cookie-policy/      # Политика Cookie
│   ├── requisites/         # Реквизиты
│   └── globals.css         # Глобальные стили
├── components/             # Переиспользуемые компоненты
│   ├── Header.tsx          # Шапка сайта
│   └── Footer.tsx          # Подвал сайта
└── data/                   # Моковые данные
    └── mockData.ts
```

## 🎨 Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - Типизация
- **TailwindCSS** - Утилитарный CSS
- **Framer Motion** - Анимации
- **Lucide React** - Иконки
- **Google Fonts** - Inter & Playfair Display

## 📱 Страницы

- `/` - Главная страница
- `/products` - Каталог товаров с фильтрацией
- `/product/[id]` - Детальная страница товара
- `/profile` - Личный кабинет
- `/promotions` - Акции и скидки
- `/privacy-policy` - Политика конфиденциальности
- `/terms` - Условия использования
- `/cookie-policy` - Политика Cookie
- `/requisites` - Реквизиты компании

## ⚙️ Особенности Next.js

### Server vs Client Components
- По умолчанию все компоненты серверные
- Интерактивные компоненты помечены `'use client'`
- Header, страницы с анимациями - клиентские

### Оптимизация изображений
- Используется `next/image` для автоматической оптимизации
- Настроены разрешенные домены в `next.config.js`

### Типизация
- Весь код на TypeScript
- Типы для продуктов и данных в `mockData.ts`

### Шрифты
- Google Fonts загружаются через `next/font`
- Оптимизированы для производительности

## 🔧 Конфигурация

### next.config.js
- Настройка доменов для изображений
- Оптимизация production сборки

### tailwind.config.js
- Кастомная цветовая палитра
- Анимации и переходы
- Шрифты

## 📦 Моковые данные

Данные находятся в `src/data/mockData.ts`:
- Products - товары
- Promotions - акции
- Categories - категории

После создания API они будут заменены на реальные запросы.

## 🎯 Следующие шаги

- [ ] Подключение к backend API
- [ ] State management (Zustand/Redux)
- [ ] Корзина и wishlist
- [ ] Авторизация и регистрация
- [ ] Интеграция платежей
- [ ] SEO оптимизация (metadata)

## 🌐 SEO

Next.js автоматически генерирует:
- Оптимизированные meta-теги
- Sitemap
- Robots.txt
- Open Graph изображения
