/**
 * Нормализация и валидация российского номера телефона
 * @param {string} phone - Номер телефона в любом формате
 * @returns {string|null} - Нормализованный номер в формате +7XXXXXXXXXX или null если невалидный
 */
export function normalizePhone(phone) {
  if (!phone) return null;
  
  // Убираем все нецифровые символы
  const cleaned = phone.replace(/\D/g, '');
  
  // Если 11 цифр и начинается с 8 или 7 - убираем первую
  if (cleaned.length === 11 && (cleaned[0] === '8' || cleaned[0] === '7')) {
    return `+7${cleaned.slice(1)}`;
  }
  
  // Если 10 цифр - добавляем +7
  if (cleaned.length === 10) {
    return `+7${cleaned}`;
  }
  
  // Если уже начинается с +7 и 12 символов
  if (cleaned.length === 11 && cleaned[0] === '7') {
    return `+${cleaned}`;
  }
  
  return null;
}

/**
 * Проверка валидности номера телефона
 * @param {string} phone - Номер телефона
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const normalized = normalizePhone(phone);
  return normalized !== null && normalized.length === 12 && normalized.startsWith('+7');
}

