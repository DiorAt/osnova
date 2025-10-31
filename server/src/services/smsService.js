// SMS сервис для отправки кодов
// В продакшене можно использовать sms.ru, twilio и т.д.

/**
 * Отправка SMS кода
 * @param {string} phone - Номер телефона
 * @param {string} code - Код для отправки
 * @returns {Promise<boolean>}
 */
export async function sendSMSCode(phone, code) {
  // Всегда выводим код в терминал для удобства разработки
  console.log('\n' + '='.repeat(50));
  console.log(`📱 SMS КОД ДЛЯ ${phone}`);
  console.log('='.repeat(50));
  console.log(`🔑 КОД: ${code}`);
  console.log(`⏰ Действителен: 5 минут`);
  console.log(`📅 Время: ${new Date().toLocaleString('ru-RU')}`);
  console.log('='.repeat(50) + '\n');

  // В режиме разработки код уже выведен выше
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Для продакшена здесь будет реальный API вызов
  // Например, через sms.ru:
  /*
  const axios = require('axios');
  try {
    const response = await axios.get('https://sms.ru/sms/send', {
      params: {
        api_id: process.env.SMS_API_ID,
        to: phone,
        msg: `Ваш код подтверждения: ${code}`,
        json: 1
      }
    });
    return response.data.status === 'OK';
  } catch (error) {
    console.error('Ошибка отправки SMS:', error);
    return false;
  }
  */

  return true;
}

/**
 * Генерация 6-значного кода
 * @returns {string}
 */
export function generateSMSCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

