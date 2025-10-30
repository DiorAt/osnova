'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Заказ и оплата',
      questions: [
        {
          q: 'Как оформить заказ?',
          a: 'Выберите товары, добавьте их в корзину и следуйте инструкциям при оформлении заказа. Вам нужно будет указать адрес доставки и выбрать способ оплаты.',
        },
        {
          q: 'Какие способы оплаты доступны?',
          a: 'Мы принимаем оплату картами Visa, MasterCard, Мир, Apple Pay, Google Pay, СБП, а также наличными и картой при получении.',
        },
        {
          q: 'Можно ли изменить или отменить заказ?',
          a: 'Да, вы можете отменить или изменить заказ до момента его отправки. Свяжитесь с нами по телефону +7 (800) 123-45-67.',
        },
        {
          q: 'Безопасна ли оплата на сайте?',
          a: 'Да, все платежи защищены по стандарту PCI DSS. Мы не храним данные ваших карт.',
        },
      ],
    },
    {
      category: 'Доставка',
      questions: [
        {
          q: 'Сколько стоит доставка?',
          a: 'Стоимость доставки зависит от региона и способа доставки. По Москве от 300₽, бесплатно от 5000₽.',
        },
        {
          q: 'Как долго ждать заказ?',
          a: 'По Москве — 1-2 дня, по России — 3-7 дней в зависимости от региона.',
        },
        {
          q: 'Можно ли примерить перед покупкой?',
          a: 'Да, при курьерской доставке вы можете примерить вещи перед оплатой.',
        },
        {
          q: 'Доставляете ли вы в мой город?',
          a: 'Мы доставляем по всей России. Проверить возможность доставки можно при оформлении заказа.',
        },
      ],
    },
    {
      category: 'Возврат и обмен',
      questions: [
        {
          q: 'Можно ли вернуть товар?',
          a: 'Да, вы можете вернуть товар в течение 14 дней с момента получения, если он сохранил товарный вид и бирки.',
        },
        {
          q: 'Как оформить возврат?',
          a: 'Создайте заявку в личном кабинете или свяжитесь с нами. Мы организуем бесплатный возврат для заказов от 3000₽.',
        },
        {
          q: 'Когда вернутся деньги?',
          a: 'Возврат средств происходит в течение 3-5 рабочих дней после получения товара на нашем складе.',
        },
        {
          q: 'Можно ли обменять товар?',
          a: 'Да, вы можете обменять товар на другой размер или цвет. Оформите обмен в личном кабинете.',
        },
      ],
    },
    {
      category: 'Размеры и товары',
      questions: [
        {
          q: 'Как выбрать размер?',
          a: 'Используйте нашу таблицу размеров на странице товара. При сомнениях выбирайте больший размер.',
        },
        {
          q: 'Товар маломерит или большемерит?',
          a: 'Информация о посадке указана в описании товара. Также смотрите отзывы других покупателей.',
        },
        {
          q: 'Как узнать, есть ли товар в наличии?',
          a: 'Наличие товара отображается на странице. Если нужного размера нет, оформите уведомление о поступлении.',
        },
        {
          q: 'Предоставляете ли гарантию?',
          a: 'Да, на все товары действует гарантия производителя. Срок указан в описании товара.',
        },
      ],
    },
    {
      category: 'Личный кабинет',
      questions: [
        {
          q: 'Как зарегистрироваться?',
          a: 'Нажмите на иконку профиля в шапке сайта и следуйте инструкциям. Регистрация займет меньше минуты.',
        },
        {
          q: 'Забыл пароль, что делать?',
          a: 'На странице входа нажмите "Забыли пароль?" и следуйте инструкциям для восстановления.',
        },
        {
          q: 'Как изменить личные данные?',
          a: 'Войдите в личный кабинет и перейдите в раздел "Настройки" для изменения данных.',
        },
        {
          q: 'Как отследить заказ?',
          a: 'В личном кабинете в разделе "Мои заказы" вы увидите актуальный статус и трек-номер для отслеживания.',
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

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
            <HelpCircle className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-6xl font-display font-bold mb-6">Часто задаваемые вопросы</h1>
            <p className="text-2xl opacity-90">Найдите ответы на популярные вопросы</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Поиск */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none text-lg"
            />
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = catIndex * 100 + index;
                  const isActive = activeIndex === globalIndex;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveIndex(isActive ? null : globalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-lg pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-5 text-gray-600 border-t">
                              <div className="pt-4">{faq.a}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Контакты */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-primary-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Не нашли ответ?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами, и мы с радостью поможем
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78001234567"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition"
            >
              +7 (800) 123-45-67
            </a>
            <a
              href="mailto:support@fashion-store.ru"
              className="px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-xl font-bold hover:shadow-xl transition"
            >
              support@fashion-store.ru
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

