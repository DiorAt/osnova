import Link from 'next/link';
import { ShoppingBag, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'О нас', href: '/about' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Вакансии', href: '/careers' },
      { label: 'Блог', href: '/blog' },
    ],
    help: [
      { label: 'Доставка и оплата', href: '/delivery' },
      { label: 'Возврат товара', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Размерная сетка', href: '/size-guide' },
    ],
    legal: [
      { label: 'Политика конфиденциальности', path: '/privacy-policy' },
      { label: 'Условия использования', path: '/terms' },
      { label: 'Политика Cookie', path: '/cookie-policy' },
      { label: 'Реквизиты', path: '/requisites' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">Fashion Store</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Современная одежда для тех, кто ценит стиль и качество. Официальная доставка по всей России.
            </p>
            
            {/* Контакты */}
            <div className="space-y-3 mb-6">
              <a href="tel:+78001234567" className="flex items-center gap-2 text-sm hover:text-primary-400 transition">
                <Phone className="w-4 h-4" />
                +7 (800) 123-45-67
              </a>
              <a href="mailto:info@fashion-store.ru" className="flex items-center gap-2 text-sm hover:text-primary-400 transition">
                <Mail className="w-4 h-4" />
                info@fashion-store.ru
              </a>
            </div>

            {/* Соц. сети */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition ${social.color} hover:text-white group`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-white font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition inline-block hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition inline-block hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.path}
                    className="text-sm hover:text-primary-400 transition inline-block hover:translate-x-1 duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2024 Fashion Store. Все права защищены.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="h-8 px-3 bg-gray-800 rounded flex items-center justify-center text-xs font-semibold hover:bg-gray-700 transition">
                VISA
              </div>
              <div className="h-8 px-3 bg-gray-800 rounded flex items-center justify-center text-xs font-semibold hover:bg-gray-700 transition">
                MASTERCARD
              </div>
              <div className="h-8 px-3 bg-gray-800 rounded flex items-center justify-center text-xs font-semibold hover:bg-gray-700 transition">
                МИР
              </div>
              <div className="h-8 px-3 bg-gray-800 rounded flex items-center justify-center text-xs font-semibold hover:bg-gray-700 transition">
                PAYPAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Отступ для мобильной навигации */}
      <div className="md:hidden h-20" />
    </footer>
  );
};

export default Footer;
