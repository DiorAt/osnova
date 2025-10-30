'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-display font-bold mb-4">Политика конфиденциальности</h1>
            <p className="text-xl opacity-90">Обновлено: 30 октября 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2>1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности персональных данных (далее – Политика) действует в отношении всей
              информации, которую интернет-магазин Fashion Store может получить о Пользователе во время использования сайта.
            </p>

            <h2>2. Персональные данные пользователей</h2>
            <p>В рамках настоящей Политики под «персональными данными Пользователя» понимаются:</p>
            <ul>
              <li>Данные, предоставляемые при регистрации</li>
              <li>Данные, передаваемые автоматически</li>
            </ul>

            <h2>3. Цели сбора персональных данных</h2>
            <ul>
              <li>Идентификация стороны в рамках соглашений</li>
              <li>Предоставление персонализированных Сервисов</li>
              <li>Связь с Пользователем</li>
              <li>Улучшение качества Сервисов</li>
            </ul>

            <h2>4. Защита персональных данных</h2>
            <p>
              Интернет-магазин принимает все необходимые меры для защиты персональных данных Пользователя.
            </p>

            <h2>5. Контактная информация</h2>
            <p>
              По всем вопросам обращайтесь: privacy@fashion-store.ru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

