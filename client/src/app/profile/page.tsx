'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ShoppingBag } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Заказы', icon: Package },
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'addresses', label: 'Адреса', icon: MapPin },
    { id: 'payment', label: 'Способы оплаты', icon: CreditCard },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  const orders = [
    {
      id: '№2024-001234',
      date: '15 января 2024',
      status: 'Доставлен',
      total: 24990,
      items: [
        { name: 'Кашемировое пальто Premium', size: 'M', color: 'Бежевый', price: 24990, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200' },
      ],
    },
    {
      id: '№2024-001235',
      date: '18 января 2024',
      status: 'В пути',
      total: 21980,
      items: [
        { name: 'Шелковая блуза Elegance', size: 'S', color: 'Белый', price: 8990, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200' },
        { name: 'Джинсы Slim Fit Premium', size: '28', color: 'Синий', price: 12990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200' },
      ],
    },
  ];

  const favorites = [
    { id: 1, name: 'Кожаная куртка Rebel', price: 34990, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200' },
    { id: 2, name: 'Платье Evening Luxe', price: 18990, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200' },
    { id: 3, name: 'Вязаный свитер Comfort', price: 7990, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Иван Иванов</h1>
              <p className="text-xl opacity-90">ivan.ivanov@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Боковое меню */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all mt-4">
                  <LogOut className="w-5 h-5" />
                  Выйти
                </button>
              </nav>
            </div>
          </aside>

          {/* Контент */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Заказы */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-display font-bold mb-6">Мои заказы</h2>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-6 shadow-md">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">Заказ {order.id}</h3>
                          <p className="text-gray-600">{order.date}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            order.status === 'Доставлен'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Размер: {item.size} • Цвет: {item.color}
                              </p>
                              <p className="font-semibold text-primary-600 mt-1">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          Итого: {order.total.toLocaleString('ru-RU')} ₽
                        </span>
                        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Избранное */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-3xl font-display font-bold mb-6">Избранное</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <p className="text-xl font-bold text-primary-600 mb-3">
                            {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                          <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            В корзину
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Адреса */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-display font-bold">Адреса доставки</h2>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      Добавить адрес
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: 'Домашний адрес', address: 'г. Москва, ул. Ленина, д. 123, кв. 45', default: true },
                      { title: 'Офис', address: 'г. Москва, ул. Пушкина, д. 67, офис 89', default: false },
                    ].map((addr, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold">{addr.title}</h3>
                          {addr.default && (
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                              По умолчанию
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{addr.address}</p>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            Изменить
                          </button>
                          <button className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                            Удалить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Способы оплаты */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-display font-bold">Способы оплаты</h2>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      Добавить карту
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl p-6 shadow-xl">
                      <div className="flex justify-between items-start mb-8">
                        <div className="text-2xl font-bold">VISA</div>
                        <div className="text-sm">**** 1234</div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-70 mb-1">Владелец карты</div>
                          <div className="font-semibold">IVAN IVANOV</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-70 mb-1">Действует до</div>
                          <div className="font-semibold">12/26</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Настройки */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-3xl font-display font-bold mb-6">Настройки профиля</h2>
                  <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                      <input
                        type="text"
                        defaultValue="Иван"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
                      <input
                        type="text"
                        defaultValue="Иванов"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="ivan.ivanov@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                      <input
                        type="tel"
                        defaultValue="+7 (999) 123-45-67"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

