'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function ContactsPage() {
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
            <h1 className="text-6xl font-display font-bold mb-6">Контакты</h1>
            <p className="text-2xl opacity-90">Мы всегда рады вам помочь!</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Контактная информация */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
            
            {[
              {
                icon: Phone,
                title: 'Телефон',
                items: [
                  { label: 'Бесплатная линия', value: '+7 (800) 123-45-67', href: 'tel:+78001234567' },
                  { label: 'Городской', value: '+7 (495) 123-45-67', href: 'tel:+74951234567' },
                ],
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Mail,
                title: 'Email',
                items: [
                  { label: 'Общие вопросы', value: 'info@fashion-store.ru', href: 'mailto:info@fashion-store.ru' },
                  { label: 'Поддержка', value: 'support@fashion-store.ru', href: 'mailto:support@fashion-store.ru' },
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: MapPin,
                title: 'Адрес',
                items: [
                  { label: 'Офис', value: 'г. Москва, ул. Ленина, д. 1, офис 100' },
                ],
                gradient: 'from-red-500 to-pink-500',
              },
              {
                icon: Clock,
                title: 'Режим работы',
                items: [
                  { label: 'Пн-Пт', value: '9:00 - 21:00' },
                  { label: 'Сб-Вс', value: '10:00 - 20:00' },
                ],
                gradient: 'from-purple-500 to-primary-500',
              },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${contact.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{contact.title}</h3>
                      <div className="space-y-2">
                        {contact.items.map((item, i) => (
                          <div key={i}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            {item.href ? (
                              <a href={item.href} className="text-lg font-medium hover:text-primary-600 transition">
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-lg font-medium">{item.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">Напишите нам</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                  placeholder="Расскажите, чем мы можем вам помочь..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition"
              >
                Отправить сообщение
              </button>
            </form>
          </motion.div>
        </div>

        {/* Социальные сети */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Мы в социальных сетях</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Следите за новинками, акциями и вдохновением в наших социальных сетях
          </p>
          <div className="flex justify-center gap-4">
            {[
              { icon: Instagram, href: 'https://instagram.com', color: 'hover:from-purple-500 hover:to-pink-500' },
              { icon: Facebook, href: 'https://facebook.com', color: 'hover:from-blue-600 hover:to-blue-500' },
              { icon: Twitter, href: 'https://twitter.com', color: 'hover:from-sky-500 hover:to-sky-400' },
              { icon: Youtube, href: 'https://youtube.com', color: 'hover:from-red-600 hover:to-red-500' },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-gray-100 to-gray-50 ${social.color} group`}
                >
                  <Icon className="w-7 h-7 text-gray-700 group-hover:text-white transition" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

