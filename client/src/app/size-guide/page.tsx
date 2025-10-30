'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, User, TrendingUp } from 'lucide-react';

export default function SizeGuidePage() {
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');

  const womenSizes = {
    tops: [
      { rus: '40', int: 'XXS', bust: '76-80', waist: '58-62', hips: '84-88' },
      { rus: '42', int: 'XS', bust: '80-84', waist: '62-66', hips: '88-92' },
      { rus: '44', int: 'S', bust: '84-88', waist: '66-70', hips: '92-96' },
      { rus: '46', int: 'M', bust: '88-92', waist: '70-74', hips: '96-100' },
      { rus: '48', int: 'L', bust: '92-96', waist: '74-78', hips: '100-104' },
      { rus: '50', int: 'XL', bust: '96-100', waist: '78-82', hips: '104-108' },
      { rus: '52', int: 'XXL', bust: '100-104', waist: '82-86', hips: '108-112' },
    ],
    jeans: [
      { rus: '40', int: '26', waist: '58-62', hips: '84-88' },
      { rus: '42', int: '27', waist: '62-66', hips: '88-92' },
      { rus: '44', int: '28', waist: '66-70', hips: '92-96' },
      { rus: '46', int: '29', waist: '70-74', hips: '96-100' },
      { rus: '48', int: '30', waist: '74-78', hips: '100-104' },
      { rus: '50', int: '31', waist: '78-82', hips: '104-108' },
    ],
  };

  const menSizes = {
    tops: [
      { rus: '44', int: 'XS', chest: '86-89', waist: '74-77', hips: '90-93' },
      { rus: '46', int: 'S', chest: '90-93', waist: '78-81', hips: '94-97' },
      { rus: '48', int: 'M', chest: '94-97', waist: '82-85', hips: '98-101' },
      { rus: '50', int: 'L', chest: '98-101', waist: '86-89', hips: '102-105' },
      { rus: '52', int: 'XL', chest: '102-105', waist: '90-94', hips: '106-109' },
      { rus: '54', int: 'XXL', chest: '106-109', waist: '95-99', hips: '110-113' },
    ],
    jeans: [
      { rus: '44', int: '29', waist: '74-77' },
      { rus: '46', int: '30', waist: '78-81' },
      { rus: '48', int: '31', waist: '82-85' },
      { rus: '50', int: '32', waist: '86-89' },
      { rus: '52', int: '33', waist: '90-94' },
      { rus: '54', int: '34', waist: '95-99' },
    ],
  };

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
            <Ruler className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-6xl font-display font-bold mb-6">Размерная сетка</h1>
            <p className="text-2xl opacity-90">Подберите идеальный размер</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Переключатель пола */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
            <button
              onClick={() => setActiveGender('women')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeGender === 'women'
                  ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👗 Женщинам
            </button>
            <button
              onClick={() => setActiveGender('men')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeGender === 'men'
                  ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👔 Мужчинам
            </button>
          </div>
        </div>

        {/* Как измерить */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Как снять мерки</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: User,
                title: 'Обхват груди',
                description: 'Измерьте по самым выступающим точкам груди, держа сантиметр параллельно полу',
              },
              {
                icon: TrendingUp,
                title: 'Обхват талии',
                description: 'Измерьте в самом узком месте талии, не затягивая сантиметр',
              },
              {
                icon: Ruler,
                title: 'Обхват бедер',
                description: 'Измерьте по самым выступающим точкам ягодиц',
              },
            ].map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Таблицы размеров */}
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Одежда */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Одежда (верх)</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary-600 to-pink-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">RUS</th>
                      <th className="px-6 py-4 text-left font-semibold">INT</th>
                      {activeGender === 'women' ? (
                        <>
                          <th className="px-6 py-4 text-left font-semibold">Обхват груди (см)</th>
                          <th className="px-6 py-4 text-left font-semibold">Обхват талии (см)</th>
                          <th className="px-6 py-4 text-left font-semibold">Обхват бедер (см)</th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-4 text-left font-semibold">Обхват груди (см)</th>
                          <th className="px-6 py-4 text-left font-semibold">Обхват талии (см)</th>
                          <th className="px-6 py-4 text-left font-semibold">Обхват бедер (см)</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(activeGender === 'women' ? womenSizes.tops : menSizes.tops).map((size, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold">{size.rus}</td>
                        <td className="px-6 py-4 font-semibold text-primary-600">{size.int}</td>
                        <td className="px-6 py-4">{activeGender === 'women' ? size.bust : size.chest}</td>
                        <td className="px-6 py-4">{size.waist}</td>
                        <td className="px-6 py-4">{size.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Джинсы */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Джинсы и брюки</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary-600 to-pink-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">RUS</th>
                      <th className="px-6 py-4 text-left font-semibold">INT</th>
                      <th className="px-6 py-4 text-left font-semibold">Обхват талии (см)</th>
                      {activeGender === 'women' && (
                        <th className="px-6 py-4 text-left font-semibold">Обхват бедер (см)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(activeGender === 'women' ? womenSizes.jeans : menSizes.jeans).map((size, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold">{size.rus}</td>
                        <td className="px-6 py-4 font-semibold text-primary-600">{size.int}</td>
                        <td className="px-6 py-4">{size.waist}</td>
                        {activeGender === 'women' && <td className="px-6 py-4">{size.hips}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Советы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Полезные советы</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-600 text-xl">•</span>
              <span>При сомнениях между размерами выбирайте больший</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 text-xl">•</span>
              <span>Обращайте внимание на состав ткани — некоторые материалы тянутся</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 text-xl">•</span>
              <span>Читайте отзывы других покупателей о посадке</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 text-xl">•</span>
              <span>При курьерской доставке вы можете примерить перед оплатой</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 text-xl">•</span>
              <span>Если нужна помощь, напишите нашему AI-помощнику или позвоните +7 (800) 123-45-67</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

