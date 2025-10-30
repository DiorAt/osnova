# Fashion Store - Frontend

Фронтенд интернет-магазина одежды, построенный на React + Vite + TailwindCSS.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр production сборки
npm run preview
```

## 📁 Структура

```
src/
├── components/      # Переиспользуемые компоненты
│   ├── Header.jsx   # Шапка сайта
│   └── Footer.jsx   # Подвал сайта
├── pages/           # Страницы приложения
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductPage.jsx
│   ├── ProfilePage.jsx
│   ├── PromotionsPage.jsx
│   └── legal/       # Юридические страницы
├── data/            # Моковые данные
│   └── mockData.js
├── App.jsx          # Главный компонент
├── main.jsx         # Точка входа
└── index.css        # Глобальные стили
```

## 🎨 Технологии

- React 18
- Vite
- TailwindCSS
- React Router DOM
- Framer Motion
- Lucide React Icons

## 📱 Страницы

- `/` - Главная
- `/products` - Каталог
- `/product/:id` - Страница товара
- `/profile` - Личный кабинет
- `/promotions` - Акции
- `/privacy-policy` - Политика конфиденциальности
- `/terms` - Условия использования
- `/cookie-policy` - Политика Cookie
- `/requisites` - Реквизиты

## ⚙️ Настройки

### TailwindCSS

Конфигурация находится в `tailwind.config.js`. Настроены:
- Кастомная цветовая палитра
- Анимации
- Шрифты

### Vite

Конфигурация в `vite.config.js`:
- Dev-сервер на порту 3000
- Автоматическое открытие браузера

