'use client';

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Cookie className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-display font-bold mb-4">Политика использования Cookie</h1>
            <p className="text-xl opacity-90">Обновлено: 30 октября 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2>1. Что такое Cookie</h2>
            <p>
              Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайта.
            </p>

            <h2>2. Как мы используем Cookie</h2>
            <ul>
              <li><strong>Необходимые:</strong> Обеспечивают основные функции</li>
              <li><strong>Функциональные:</strong> Запоминают ваш выбор</li>
              <li><strong>Аналитические:</strong> Помогают понять взаимодействие</li>
              <li><strong>Маркетинговые:</strong> Для релевантной рекламы</li>
            </ul>

            <h2>3. Управление Cookie</h2>
            <p>
              Вы можете контролировать cookies через настройки браузера. Обратите внимание, что отключение cookies может
              повлиять на функциональность сайта.
            </p>

            <h2>4. Контакты</h2>
            <p>
              Email: privacy@fashion-store.ru<br />
              Телефон: +7 (800) 123-45-67
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

