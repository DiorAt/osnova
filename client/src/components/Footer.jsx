import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'О нас', href: '#' },
      { label: 'Контакты', href: '#' },
      { label: 'Вакансии', href: '#' },
      { label: 'Блог', href: '#' },
    ],
    help: [
      { label: 'Доставка и оплата', href: '#' },
      { label: 'Возврат товара', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Размерная сетка', href: '#' },
    ],
    legal: [
      { label: 'Политика конфиденциальности', path: '/privacy-policy' },
      { label: 'Условия использования', path: '/terms' },
      { label: 'Политика Cookie', path: '/cookie-policy' },
      { label: 'Реквизиты', path: '/requisites' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">Fashion Store</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-sm">
              Современная одежда для тех, кто ценит стиль и качество. Официальная доставка по всей России.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-white font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Помощь */}
          <div>
            <h3 className="text-white font-semibold mb-4">Помощь</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary-400 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Правовая информация */}
          <div>
            <h3 className="text-white font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Fashion Store. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img src="https://via.placeholder.com/50x30?text=VISA" alt="Visa" className="h-8 opacity-70" />
              <img src="https://via.placeholder.com/50x30?text=MC" alt="Mastercard" className="h-8 opacity-70" />
              <img src="https://via.placeholder.com/50x30?text=МИР" alt="Мир" className="h-8 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

