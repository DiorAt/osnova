'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/mockData';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedGender !== 'all' && product.gender !== selectedGender && product.gender !== 'unisex') return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-display font-bold mb-4">Каталог</h1>
            <p className="text-xl opacity-90">Найдите свой идеальный стиль</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Фильтры - десктоп */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sticky top-24 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                  Фильтры
                </h2>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setPriceRange([0, 50000]);
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Сбросить
                </button>
              </div>

              {/* Категории */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-primary-600 to-pink-600 rounded-full"></div>
                  Категория
                </h3>
                <div className="space-y-2">
                  {['all', ...categories.map(c => c.name)].map((cat) => {
                    const category = categories.find(c => c.name === cat);
                    const isAll = cat === 'all';
                    const isSelected = selectedCategory === cat;
                    
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md'
                        }`}
                      >
                        <span className="font-medium">{isAll ? 'Все категории' : cat}</span>
                        {!isAll && category && (
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            isSelected ? 'bg-white/20' : 'bg-gray-100'
                          }`}>
                            {category.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Пол */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-primary-600 to-pink-600 rounded-full"></div>
                  Для кого
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'all', label: 'Все', emoji: '👥' },
                    { value: 'women', label: 'Женщины', emoji: '👗' },
                    { value: 'men', label: 'Мужчины', emoji: '👔' },
                  ].map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => setSelectedGender(gender.value)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                        selectedGender === gender.value
                          ? 'bg-gradient-to-br from-primary-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl mb-1">{gender.emoji}</span>
                      <span className="text-xs font-medium">{gender.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-primary-600 to-pink-600 rounded-full"></div>
                  Цена
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 mb-1 block">От</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 mb-1 block">До</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                    <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Товары */}
          <div className="flex-1">
            {/* Сортировка и мобильные фильтры */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  Найдено: <span className="font-semibold">{sortedProducts.length}</span> товаров
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="popular">Популярные</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="discount">Скидки</option>
                </select>
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Фильтры
                </button>
              </div>
            </div>

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">Нет в наличии</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

