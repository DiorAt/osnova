'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Кашемировое пальто Premium',
      price: 24990,
      size: 'M',
      color: 'Бежевый',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200',
    },
    {
      id: 2,
      name: 'Шелковая блуза Elegance',
      price: 8990,
      size: 'S',
      color: 'Белый',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200',
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                <ShoppingBag className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold">Корзина</h2>
                <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                  {cartItems.length}
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
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">Корзина пуста</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Перейти к покупкам
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.size} • {item.color}
                        </p>
                        <p className="font-bold text-primary-600">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-white transition flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-white transition flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Итого:</span>
                  <span className="text-3xl font-bold text-gradient">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition">
                  Оформить заказ
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 mt-2 text-gray-600 hover:text-gray-900 transition"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

