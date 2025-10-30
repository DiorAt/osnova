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
    { icon: Sparkles, label: 'AI', path: null, onClick: onAIClick },
    { icon: ShoppingBag, label: 'Корзина', path: null, onClick: onCartClick, badge: cartCount },
    { icon: User, label: 'Профиль', path: '/profile', onClick: null },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.path === pathname;
          
          const content = (
            <>
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-600'}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium mt-1 ${isActive ? 'text-primary-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
              {isActive && (
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
              className="relative flex flex-col items-center justify-center py-3 hover:bg-gray-50 transition"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

