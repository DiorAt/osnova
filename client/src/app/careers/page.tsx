'use client';

import { motion } from 'framer-motion';
import { Briefcase, Heart, TrendingUp, Users } from 'lucide-react';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Frontend разработчик',
      department: 'Разработка',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
    },
    {
      title: 'Менеджер по продажам',
      department: 'Продажи',
      location: 'Москва',
      type: 'Полная занятость',
    },
    {
      title: 'SMM-специалист',
      department: 'Маркетинг',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
    },
    {
      title: 'Стилист-консультант',
      department: 'Клиентский сервис',
      location: 'Москва',
      type: 'Частичная занятость',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Забота о здоровье',
      description: 'ДМС, фитнес и программы well-being',
    },
    {
      icon: TrendingUp,
      title: 'Развитие',
      description: 'Обучение, тренинги и карьерный рост',
    },
    {
      icon: Users,
      title: 'Команда',
      description: 'Дружный коллектив и корпоративные мероприятия',
    },
    {
      icon: Briefcase,
      title: 'Гибкость',
      description: 'Возможность удаленной работы и гибкий график',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl font-display font-bold mb-6">Карьера в Fashion Store</h1>
            <p className="text-2xl opacity-90">
              Присоединяйтесь к команде, которая создает будущее моды
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* О работе */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-6">Почему Fashion Store?</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Мы — динамично развивающаяся компания, где ценят креативность, инновации и людей. 
            Здесь вы сможете реализовать свой потенциал, работать с последними технологиями 
            и быть частью команды профессионалов.
          </p>
        </motion.div>

        {/* Преимущества */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Что мы предлагаем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Вакансии */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Открытые вакансии</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full font-medium">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        📍 {position.location}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        ⏰ {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition whitespace-nowrap">
                    Откликнуться
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Инициативная заявка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-6">Не нашли подходящую вакансию?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Отправьте нам свое резюме, и мы свяжемся с вами, как только появится подходящая позиция
          </p>
          <a
            href="mailto:hr@fashion-store.ru"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition"
          >
            Отправить резюме
          </a>
        </motion.div>
      </div>
    </div>
  );
}

