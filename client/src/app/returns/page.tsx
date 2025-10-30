'use client';

import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <RefreshCw className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-6xl font-display font-bold mb-6">Возврат товара</h1>
            <p className="text-2xl opacity-90">14 дней на возврат без лишних вопросов</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Условия возврата */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Условия возврата</h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Вы можете вернуть товар в течение <strong className="text-primary-600">14 дней</strong> с момента получения, 
                если он не подошел по размеру, цвету или не понравился по другим причинам.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Что можно вернуть */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">Можно вернуть</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Товар в оригинальной упаковке',
                'Сохранены все ярлыки и бирки',
                'Нет следов использования',
                'Есть чек или электронное подтверждение',
                'Товар не из списка исключений',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold">Нельзя вернуть</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Нижнее белье (по гигиеническим соображениям)',
                'Товары со следами носки',
                'Поврежденные товары',
                'Товар без бирок и ярлыков',
                'Товары из раздела "Распродажа"',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">✗</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Как вернуть */}
        <div className="mb-16">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Как оформить возврат</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: 'Заявка',
                description: 'Оформите заявку на возврат в личном кабинете или напишите нам',
              },
              {
                step: '2',
                title: 'Упаковка',
                description: 'Упакуйте товар в оригинальную упаковку с бирками',
              },
              {
                step: '3',
                title: 'Отправка',
                description: 'Передайте товар курьеру или отправьте почтой',
              },
              {
                step: '4',
                title: 'Возврат средств',
                description: 'Деньги вернутся в течение 3-5 рабочих дней',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Частые вопросы</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Сколько стоит возврат?',
                a: 'Возврат бесплатный при заказе от 3000₽. В остальных случаях стоимость обратной доставки — 300₽.',
              },
              {
                q: 'Когда вернутся деньги?',
                a: 'После получения товара на складе мы проверяем его состояние. Возврат средств происходит в течение 3-5 рабочих дней.',
              },
              {
                q: 'Можно ли вернуть часть заказа?',
                a: 'Да, вы можете вернуть как весь заказ, так и отдельные позиции.',
              },
              {
                q: 'Куда вернутся деньги?',
                a: 'Деньги возвращаются тем же способом, которым была произведена оплата: на карту или наличными.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Нужна помощь?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нашей службой поддержки, и мы поможем решить любой вопрос
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78001234567"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition"
            >
              Позвонить
            </a>
            <a
              href="mailto:support@fashion-store.ru"
              className="px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-xl font-bold hover:shadow-xl transition"
            >
              Написать
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

