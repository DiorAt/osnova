'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Award, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
            <h1 className="text-6xl font-display font-bold mb-6">О нас</h1>
            <p className="text-2xl opacity-90">
              Мы создаем моду, которая вдохновляет и объединяет
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* История */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-4xl font-display font-bold mb-6 text-gradient">Наша история</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Fashion Store был основан в 2020 году с простой, но амбициозной целью — сделать качественную 
                и стильную одежду доступной для каждого в России.
              </p>
              <p>
                Начав как небольшой интернет-магазин, мы быстро завоевали доверие тысяч покупателей благодаря 
                нашему вниманию к качеству, уникальному дизайну и безупречному сервису.
              </p>
              <p>
                Сегодня Fashion Store — это не просто магазин одежды. Это сообщество людей, которые ценят стиль, 
                качество и индивидуальность. Мы работаем с лучшими производителями и дизайнерами, чтобы предложить 
                вам только самое лучшее.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ценности */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Качество',
                description: 'Только премиальные материалы и безупречное исполнение',
                gradient: 'from-red-500 to-pink-500',
              },
              {
                icon: Award,
                title: 'Стиль',
                description: 'Актуальные тренды и вечная классика в одном месте',
                gradient: 'from-primary-500 to-purple-500',
              },
              {
                icon: Users,
                title: 'Клиенты',
                description: 'Ваше удовлетворение — наш главный приоритет',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: TrendingUp,
                title: 'Инновации',
                description: 'Современные технологии для вашего удобства',
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Команда */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12"
        >
          <h2 className="text-4xl font-display font-bold text-center mb-8">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-2">10,000+</div>
              <p className="text-gray-700 font-medium">Довольных клиентов</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-2">500+</div>
              <p className="text-gray-700 font-medium">Брендов</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient mb-2">99%</div>
              <p className="text-gray-700 font-medium">Положительных отзывов</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

