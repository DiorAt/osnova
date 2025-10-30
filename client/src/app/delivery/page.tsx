'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, CreditCard, Package } from 'lucide-react';

export default function DeliveryPage() {
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
            <Truck className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-6xl font-display font-bold mb-6">Доставка и оплата</h1>
            <p className="text-2xl opacity-90">Удобные способы получения и оплаты заказа</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Доставка */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Способы доставки</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Truck,
                title: 'Курьерская доставка',
                description: 'По Москве — 1-2 дня',
                price: 'от 300₽',
                details: ['Бесплатно от 5000₽', 'Удобное время доставки', 'Примерка перед оплатой'],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: MapPin,
                title: 'Пункты выдачи',
                description: 'Более 1000 пунктов',
                price: 'от 150₽',
                details: ['Бесплатно от 3000₽', 'Хранение до 5 дней', 'Примерка в ПВЗ'],
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Package,
                title: 'Почта России',
                description: 'По всей России',
                price: 'от 250₽',
                details: ['Срок доставки 5-14 дней', 'Отслеживание посылки', 'Доставка до двери'],
                gradient: 'from-purple-500 to-primary-500',
              },
            ].map((delivery, index) => {
              const Icon = delivery.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${delivery.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{delivery.title}</h3>
                  <p className="text-gray-600 mb-2">{delivery.description}</p>
                  <p className="text-2xl font-bold text-primary-600 mb-4">{delivery.price}</p>
                  <ul className="space-y-2">
                    {delivery.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Оплата */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Способы оплаты</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: CreditCard,
                title: 'Онлайн-оплата',
                methods: ['Банковские карты (Visa, MasterCard, Мир)', 'Apple Pay, Google Pay', 'СБП (Система быстрых платежей)'],
                gradient: 'from-primary-500 to-pink-500',
              },
              {
                icon: Package,
                title: 'При получении',
                methods: ['Наличными курьеру', 'Картой курьеру', 'В пункте выдачи'],
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((payment, index) => {
              const Icon = payment.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${payment.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{payment.title}</h3>
                  <ul className="space-y-3">
                    {payment.methods.map((method, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700">{method}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Важная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary-600" />
            Важная информация
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-600">•</span>
              <span>Бесплатная доставка при заказе от 5000₽</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600">•</span>
              <span>Все заказы застрахованы</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600">•</span>
              <span>Отслеживание заказа в личном кабинете</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600">•</span>
              <span>SMS-уведомления о статусе заказа</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600">•</span>
              <span>Возможность примерки перед оплатой (при курьерской доставке)</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

