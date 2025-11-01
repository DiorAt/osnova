'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Sparkles, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  onSearchClick: () => void;
  onAIClick: () => void;
  onCartClick: () => void;
  cartCount?: number;
}

export default function MobileNav({ onSearchClick, onAIClick, onCartClick, cartCount = 0 }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Главная', path: '/', onClick: null },
    { icon: Search, label: 'Поиск', path: null, onClick: onSearchClick },
    { icon: Sparkles, label: 'AI', path: null, onClick: onAIClick, isAI: true },
    { icon: ShoppingBag, label: 'Корзина', path: null, onClick: onCartClick, badge: cartCount },
    { icon: User, label: 'Профиль', path: '/auth', onClick: null },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.path === pathname;
          const isAI = item.isAI;
          
          const content = (
            <>
              <div className={`relative ${isAI ? 'w-14 h-14 -mt-2 rounded-full bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg ring-4 ring-primary-100' : ''}`}>
                {isAI ? (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                ) : (
                  <Icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-600'}`} />
                )}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium mt-1 ${isAI ? 'text-primary-600 font-bold' : isActive ? 'text-primary-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
              {isActive && !isAI && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-600 to-pink-600 rounded-b-full"
                />
              )}
            </>
          );

          if (item.path) {
            return (
              <Link
                key={index}
                href={item.path}
                className="relative flex flex-col items-center justify-center py-3 hover:bg-gray-50 transition"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={index}
              onClick={item.onClick || undefined}
              className={`relative flex flex-col items-center justify-center py-3 transition ${
                isAI ? 'hover:bg-transparent' : 'hover:bg-gray-50'
              }`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

