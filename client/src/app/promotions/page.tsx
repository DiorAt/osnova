'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { promotions } from '@/data/mockData';

export default function PromotionsPage() {
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
            <Tag className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-6xl font-display font-bold mb-4">Акции и скидки</h1>
            <p className="text-2xl opacity-90">Не упустите выгодные предложения!</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Основная акция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={promotions[0].image}
              alt={promotions[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
              <div className="h-full flex items-center">
                <div className="max-w-2xl p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-full text-lg font-bold mb-6">
                      Скидка до {promotions[0].discount}%
                    </div>
                    <h2 className="text-6xl font-display font-bold mb-6">{promotions[0].title}</h2>
                    <p className="text-2xl mb-8 opacity-90">{promotions[0].description}</p>
                    <div className="flex items-center gap-2 mb-8 text-lg">
                      <Clock className="w-6 h-6" />
                      <span>Действует до {new Date(promotions[0].endDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      К покупкам
                      <ArrowRight className="w-6 h-6" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Все акции */}
        <div>
          <h2 className="text-4xl font-display font-bold mb-8 text-center">Все акции</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href="/products">
                  <div className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <div className="absolute bottom-0 p-8 text-white w-full">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-pink-500 rounded-full text-sm font-bold mb-4">
                          -{promo.discount}%
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-3">{promo.title}</h3>
                        <p className="text-lg mb-4 opacity-90">{promo.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>До {new Date(promo.endDate).toLocaleDateString('ru-RU')}</span>
                          </div>
                          <span className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                            Подробнее <ArrowRight className="w-5 h-5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-4">Не упустите выгоду!</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Подпишитесь на нашу рассылку и получайте уведомления о новых акциях и эксклюзивных предложениях
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition">
              Подписаться
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

