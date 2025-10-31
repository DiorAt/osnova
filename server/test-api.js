// Простой скрипт для тестирования API

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Тестирование API...\n');

  // 1. Health check
  try {
    console.log('1. Проверка здоровья сервера...');
    const health = await fetch(`${API_URL}/health`);
    const healthData = await health.json();
    console.log('✅ Сервер работает:', healthData);
  } catch (err) {
    console.error('❌ Сервер не отвечает:', err.message);
    console.log('💡 Убедитесь, что сервер запущен: cd server && npm run dev');
    return;
  }

  // 2. Отправка SMS кода
  try {
    console.log('\n2. Отправка SMS кода...');
    const sendCode = await fetch(`${API_URL}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '79991234567' }),
    });
    const codeData = await sendCode.json();
    console.log('✅ Код отправлен:', codeData);
    
    if (codeData.success) {
      console.log(`📱 Номер: ${codeData.phone}`);
      console.log('💡 Проверьте консоль сервера для получения кода!');
    }
  } catch (err) {
    console.error('❌ Ошибка отправки кода:', err.message);
  }
}

testAPI();

