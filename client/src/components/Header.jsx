import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const location = useLocation();

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Верхняя полоса */}
        <div className="border-b border-gray-200 py-2">
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
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gradient">Fashion Store</span>
            </Link>

            {/* Навигация - десктоп */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-700 hover:text-primary-600 transition font-medium ${
                    location.pathname === link.path ? 'text-primary-600' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Иконки действий */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <User className="w-5 h-5 text-gray-700" />
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition hidden md:block">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-gray-700 hover:text-primary-600 transition font-medium ${
                    location.pathname === link.path ? 'text-primary-600' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

