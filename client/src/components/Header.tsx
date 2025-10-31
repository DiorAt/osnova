'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Heart, Search, Sparkles } from 'lucide-react';
import SearchModal from './SearchModal';
import CartModal from './CartModal';
import WishlistModal from './WishlistModal';
import AIAssistantModal from './AIAssistantModal';
import MobileNav from './MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [cartCount] = useState(3);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/products', label: 'Каталог' },
    { path: '/promotions', label: 'Акции' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Верхняя полоса - скрыта на мобильных */}
          <div className="hidden md:block border-b border-gray-200 py-2">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-600">Бесплатная доставка от 5000₽</p>
              <div className="flex gap-4">
                <a href="tel:+78001234567" className="text-gray-600 hover:text-primary-600 transition">
                  +7 (800) 123-45-67
                </a>
              </div>
            </div>
          </div>

          {/* Основная навигация */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Лого */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold text-gradient hidden sm:inline">Fashion Store</span>
                <span className="text-xl font-display font-bold text-gradient sm:hidden">FS</span>
              </Link>

              {/* Навигация - десктоп */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-gray-700 hover:text-primary-600 transition font-medium ${
                      pathname === link.path ? 'text-primary-600' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Иконки действий - десктоп */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Поиск"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="p-2 hover:bg-primary-50 text-primary-600 rounded-lg transition group"
                  aria-label="AI-помощник"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                </button>
              <Link href="/auth" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <User className="w-5 h-5 text-gray-700" />
              </Link>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Избранное"
                >
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                  aria-label="Корзина"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Мобильные иконки (минимальные) */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="p-2 hover:bg-primary-50 text-primary-600 rounded-lg transition"
                  aria-label="AI-помощник"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Модальные окна */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {/* Мобильная навигация */}
      <MobileNav
        onSearchClick={() => setIsSearchOpen(true)}
        onAIClick={() => setIsAIOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      {/* Отступ для мобильной навигации */}
      <div className="md:hidden h-20" />
    </>
  );
};

export default Header;
