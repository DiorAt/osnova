import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { products, promotions } from '../data/mockData';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);
  const mainPromotion = promotions[0];

  return (
    <div className="overflow-hidden">
      {/* Hero секция */}
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 h-full">
          <div className="grid md:grid-cols-2 gap-12 items-center h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                Стиль, который
                <span className="text-gradient block">вдохновляет</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Откройте для себя эксклюзивную коллекцию одежды премиум-класса. Создайте свой неповторимый образ.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  Смотреть каталог
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/promotions"
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200"
                >
                  Акции
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-pink-400 rounded-3xl transform rotate-6 opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
                  alt="Fashion"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Плавающие элементы */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-10 hidden lg:block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60 blur-xl"></div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-10 hidden lg:block"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-40 blur-2xl"></div>
        </motion.div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'Премиум качество', desc: 'Только лучшие ткани и материалы' },
              { icon: TrendingUp, title: 'Актуальные тренды', desc: 'Новые коллекции каждый сезон' },
              { icon: Shield, title: 'Гарантия возврата', desc: '14 дней на возврат без вопросов' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Баннер акции */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Link to="/promotions">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={mainPromotion.image}
                alt={mainPromotion.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="max-w-xl p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="inline-block px-4 py-2 bg-primary-500 rounded-full text-sm font-semibold mb-4">
                      До -{mainPromotion.discount}%
                    </span>
                    <h2 className="text-5xl font-display font-bold mb-4">{mainPromotion.title}</h2>
                    <p className="text-xl mb-6">{mainPromotion.description}</p>
                    <span className="inline-flex items-center gap-2 text-lg font-semibold">
                      Смотреть все акции <ArrowRight />
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Рекомендуемые товары */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Популярные товары</h2>
            <p className="text-gray-600 text-lg">Выбор наших покупателей</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary-600">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through">
                            {product.oldPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:shadow-xl"
            >
              Смотреть все товары
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

