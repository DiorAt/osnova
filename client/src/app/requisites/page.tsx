'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function RequisitesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Building2 className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-display font-bold mb-4">Реквизиты</h1>
            <p className="text-xl opacity-90">Юридическая и контактная информация</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-primary-600">Информация о компании</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Полное наименование</p>
                    <p className="font-semibold text-lg">ООО "Fashion Store"</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">ИНН</p>
                    <p className="font-semibold text-lg">7701234567</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">КПП</p>
                    <p className="font-semibold text-lg">770101001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">ОГРН</p>
                    <p className="font-semibold text-lg">1234567890123</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-600">Юридический адрес</h2>
                <p className="text-lg">123456, г. Москва, ул. Ленина, д. 1, офис 100</p>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-600">Банковские реквизиты</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Расчетный счет</p>
                    <p className="font-semibold text-lg">40702810100000000001</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">БИК</p>
                    <p className="font-semibold text-lg">044525225</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-1">Банк</p>
                    <p className="font-semibold text-lg">ПАО "Сбербанк России"</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-600">Контактная информация</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Телефон</p>
                    <p className="font-semibold text-lg">+7 (800) 123-45-67</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-lg">info@fashion-store.ru</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Режим работы</p>
                    <p className="font-semibold text-lg">Пн-Пт: 9:00 - 21:00, Сб-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

