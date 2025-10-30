'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Тренды весна-лето 2024: что будет модно',
      excerpt: 'Разбираем главные тенденции наступающего сезона и показываем, как их носить',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      category: 'Тренды',
      date: '15 января 2024',
      author: 'Анна Петрова',
      readTime: '5 мин',
    },
    {
      id: 2,
      title: 'Как создать капсульный гардероб',
      excerpt: 'Пошаговое руководство по созданию универсального гардероба из базовых вещей',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      category: 'Стиль',
      date: '12 января 2024',
      author: 'Мария Иванова',
      readTime: '7 мин',
    },
    {
      id: 3,
      title: 'Уход за одеждой: советы профессионалов',
      excerpt: 'Как правильно ухаживать за разными типами тканей и продлить жизнь любимым вещам',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      category: 'Уход',
      date: '10 января 2024',
      author: 'Елена Смирнова',
      readTime: '6 мин',
    },
    {
      id: 4,
      title: 'Деловой стиль: новые правила',
      excerpt: 'Современный подход к офисному дресс-коду и идеи образов для работы',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800',
      category: 'Стиль',
      date: '8 января 2024',
      author: 'Ольга Козлова',
      readTime: '8 мин',
    },
    {
      id: 5,
      title: 'Экологичная мода: как выбирать осознанно',
      excerpt: 'Разбираемся в устойчивой моде и учимся делать экологичный выбор',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
      category: 'Экология',
      date: '5 января 2024',
      author: 'Дарья Волкова',
      readTime: '10 мин',
    },
    {
      id: 6,
      title: 'Аксессуары: как расставить акценты',
      excerpt: 'Правила сочетания аксессуаров и создания гармоничного образа',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800',
      category: 'Аксессуары',
      date: '3 января 2024',
      author: 'София Николаева',
      readTime: '5 мин',
    },
  ];

  const categories = ['Все', 'Тренды', 'Стиль', 'Уход', 'Экология', 'Аксессуары'];

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
            <h1 className="text-6xl font-display font-bold mb-6">Блог Fashion Store</h1>
            <p className="text-2xl opacity-90">Вдохновение, советы и тренды мира моды</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-white rounded-full font-medium hover:bg-gradient-to-r hover:from-primary-600 hover:to-pink-600 hover:text-white transition shadow-md hover:shadow-lg"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Посты */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                    Читать далее
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Подписка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-6">Подпишитесь на рассылку</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Получайте новые статьи, советы стилистов и эксклюзивные предложения на почту
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition whitespace-nowrap">
              Подписаться
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

