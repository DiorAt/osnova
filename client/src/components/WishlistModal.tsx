'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 4,
      name: 'Кожаная куртка Rebel',
      price: 34990,
      category: 'Верхняя одежда',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200',
      inStock: true,
    },
    {
      id: 6,
      name: 'Платье Evening Luxe',
      price: 18990,
      category: 'Платья',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200',
      inStock: true,
    },
    {
      id: 5,
      name: 'Вязаный свитер Comfort',
      price: 7990,
      oldPrice: 9990,
      category: 'Свитера',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200',
      inStock: true,
    },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                <h2 className="text-2xl font-bold">Избранное</h2>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">Список избранного пуст</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Перейти к покупкам
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {wishlistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition group"
                    >
                      <Link href={`/product/${item.id}`} onClick={onClose}>
                        <div className="flex gap-4 p-4">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                            <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary-600">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </span>
                              {item.oldPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {item.oldPrice.toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="flex gap-2 p-4 pt-0">
                        <button
                          className="flex-1 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          В корзину
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

