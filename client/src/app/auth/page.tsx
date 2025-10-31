'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, User, Calendar, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';

type AuthStep = 'phone' | 'code' | 'register';

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    age: '',
    gender: '' as 'male' | 'female' | 'other' | '',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Отправка SMS кода
  const handleSendCode = async () => {
    // Валидация номера
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
      setError('Введите корректный номер телефона (10 или 11 цифр)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Отправка запроса на:', `${API_URL}/auth/send-code`);
      console.log('Телефон:', phone);
      
      const response = await fetch(`${API_URL}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log('Ответ сервера:', data);

      if (response.ok) {
        setStep('code');
        setError('');
      } else {
        const errorMsg = data.error || data.errors?.[0]?.msg || 'Ошибка отправки кода';
        setError(errorMsg);
        console.error('Ошибка:', errorMsg);
      }
    } catch (err: any) {
      console.error('Ошибка запроса:', err);
      setError(`Ошибка подключения к серверу: ${err.message || 'Проверьте, что сервер запущен на порту 5000'}`);
    } finally {
      setLoading(false);
    }
  };

  // Проверка кода
  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Проверка кода для:', phone);
      
      const response = await fetch(`${API_URL}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const data = await response.json();
      console.log('Ответ сервера:', data);

      if (response.ok) {
        if (data.requiresRegistration) {
          // Нужна регистрация
          setStep('register');
          setError('');
        } else {
          // Авторизация успешна
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          router.push('/profile');
        }
      } else {
        const errorMsg = data.error || data.errors?.[0]?.msg || 'Неверный код';
        setError(errorMsg);
        console.error('Ошибка:', errorMsg);
      }
    } catch (err: any) {
      console.error('Ошибка запроса:', err);
      setError(`Ошибка подключения к серверу: ${err.message || 'Проверьте, что сервер запущен'}`);
    } finally {
      setLoading(false);
    }
  };

  // Регистрация
  const handleRegister = async () => {
    if (!registrationData.firstName || !registrationData.lastName) {
      setError('Заполните обязательные поля (Имя и Фамилия)');
      return;
    }

    if (registrationData.firstName.length < 2) {
      setError('Имя должно содержать минимум 2 символа');
      return;
    }

    if (registrationData.lastName.length < 2) {
      setError('Фамилия должна содержать минимум 2 символа');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const requestData = {
        phone,
        code,
        firstName: registrationData.firstName.trim(),
        lastName: registrationData.lastName.trim(),
        middleName: registrationData.middleName?.trim() || null,
        email: registrationData.email?.trim() || null,
        age: registrationData.age ? parseInt(registrationData.age) : null,
        gender: registrationData.gender || null,
      };

      console.log('Регистрация с данными:', requestData);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Ответ сервера:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/profile');
      } else {
        const errorMsg = data.error || data.errors?.[0]?.msg || 'Ошибка регистрации';
        setError(errorMsg);
        console.error('Ошибка:', errorMsg, data);
      }
    } catch (err: any) {
      console.error('Ошибка запроса:', err);
      setError(`Ошибка подключения к серверу: ${err.message || 'Проверьте, что сервер запущен'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-pink-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">
              {step === 'phone' && 'Вход'}
              {step === 'code' && 'Подтверждение'}
              {step === 'register' && 'Регистрация'}
            </h1>
            <p className="opacity-90">
              {step === 'phone' && 'Введите номер телефона для входа'}
              {step === 'code' && 'Введите код из SMS'}
              {step === 'register' && 'Заполните данные для регистрации'}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* Шаг 1: Ввод телефона */}
              {step === 'phone' && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Номер телефона
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 11) {
                            setPhone(value);
                            setError('');
                          }
                        }}
                        placeholder="+7 (999) 123-45-67"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-lg"
                      />
                    </div>
                    {phone && (
                      <p className="mt-2 text-sm text-gray-500">
                        {phone.length === 11 ? '✓ Формат корректен' : 'Введите 11 цифр'}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleSendCode}
                    disabled={loading || phone.length !== 11}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Отправка...' : 'Получить код'}
                  </button>
                </motion.div>
              )}

              {/* Шаг 2: Ввод кода */}
              {step === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <button
                      onClick={() => setStep('phone')}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Изменить номер
                    </button>
                    <p className="text-sm text-gray-600 mb-4">
                      Код отправлен на номер:<br />
                      <span className="font-semibold text-gray-900">+7 {phone.slice(1)}</span>
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Код из SMS
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setCode(value);
                        setError('');
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-center text-2xl font-bold tracking-widest"
                    />
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Введите 6-значный код
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleVerifyCode}
                    disabled={loading || code.length !== 6}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Проверка...' : 'Подтвердить'}
                  </button>

                  <button
                    onClick={handleSendCode}
                    className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Отправить код повторно
                  </button>
                </motion.div>
              )}

              {/* Шаг 3: Регистрация */}
              {step === 'register' && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div>
                    <button
                      onClick={() => setStep('code')}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Назад к коду
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={registrationData.firstName}
                          onChange={(e) => setRegistrationData({ ...registrationData, firstName: e.target.value })}
                          placeholder="Иван"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={registrationData.lastName}
                        onChange={(e) => setRegistrationData({ ...registrationData, lastName: e.target.value })}
                        placeholder="Иванов"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Отчество
                    </label>
                    <input
                      type="text"
                      value={registrationData.middleName}
                      onChange={(e) => setRegistrationData({ ...registrationData, middleName: e.target.value })}
                      placeholder="Иванович"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                        placeholder="ivan@example.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Возраст
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={registrationData.age}
                          onChange={(e) => setRegistrationData({ ...registrationData, age: e.target.value })}
                          placeholder="25"
                          min="14"
                          max="120"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Пол
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                        <select
                          value={registrationData.gender}
                          onChange={(e) => setRegistrationData({ ...registrationData, gender: e.target.value as any })}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none appearance-none bg-white"
                        >
                          <option value="">Не указан</option>
                          <option value="male">Мужской</option>
                          <option value="female">Женский</option>
                          <option value="other">Другой</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={loading || !registrationData.firstName || !registrationData.lastName}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            условиями использования
          </a>{' '}
          и{' '}
          <a href="/privacy-policy" className="text-primary-600 hover:underline">
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </div>
  );
}

