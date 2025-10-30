'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-display font-bold mb-4">Условия использования</h1>
            <p className="text-xl opacity-90">Обновлено: 30 октября 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2>1. Общие условия</h2>
            <p>
              Настоящие Условия регулируют отношения между ООО "Fashion Store" и Покупателем.
            </p>

            <h2>2. Оформление заказа</h2>
            <ul>
              <li>Минимальная сумма не ограничена</li>
              <li>Оформление через сайт самостоятельно</li>
              <li>Необходима достоверная информация</li>
            </ul>

            <h2>3. Доставка товара</h2>
            <ul>
              <li>По городу: 1-3 рабочих дня</li>
              <li>По регионам: 3-7 рабочих дней</li>
              <li>Бесплатно от 5000₽</li>
            </ul>

            <h2>4. Оплата товара</h2>
            <ul>
              <li>Банковской картой онлайн</li>
              <li>Наличными курьеру</li>
              <li>Картой курьеру</li>
            </ul>

            <h2>5. Возврат товара</h2>
            <p>
              Возврат возможен в течение 14 дней при сохранении товарного вида.
            </p>

            <h2>6. Контакты</h2>
            <p>
              Email: info@fashion-store.ru<br />
              Телефон: +7 (800) 123-45-67
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

