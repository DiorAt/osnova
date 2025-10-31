-- Заполнение начальными данными

-- Категории
INSERT INTO categories (name, slug) VALUES
('Верхняя одежда', 'outerwear'),
('Блузки', 'blouses'),
('Джинсы', 'jeans'),
('Платья', 'dresses'),
('Костюмы', 'suits'),
('Свитера', 'sweaters'),
('Спортивная одежда', 'sportswear'),
('Аксессуары', 'accessories')
ON CONFLICT (name) DO NOTHING;

-- Товары (примеры)
INSERT INTO products (name, price, old_price, category_id, gender, sizes, colors, images, description, material, care, rating, reviews_count, in_stock, discount) VALUES
('Кашемировое пальто Premium', 24990.00, 34990.00, 1, 'women', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Бежевый', 'Черный', 'Серый'], ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800'], 'Элегантное пальто из натурального кашемира', '100% кашемир', 'Химчистка', 4.8, 124, true, 29),
('Шелковая блуза Elegance', 8990.00, NULL, 2, 'women', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Белый', 'Черный', 'Изумрудный'], ARRAY['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800'], 'Роскошная блуза из натурального шелка', '100% шелк', 'Ручная стирка', 4.9, 89, true, 0),
('Джинсы Slim Fit Premium', 12990.00, 15990.00, 3, 'unisex', ARRAY['26', '27', '28', '29', '30', '31', '32', '33', '34'], ARRAY['Синий', 'Черный', 'Серый'], ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'], 'Премиальные джинсы с идеальной посадкой', '98% хлопок, 2% эластан', 'Стирка при 30°C', 4.7, 203, true, 19)
ON CONFLICT DO NOTHING;

-- Акции
INSERT INTO promotions (title, description, discount, image, start_date, end_date, type) VALUES
('Зимняя распродажа', 'Скидки до 50% на всю зимнюю коллекцию', 50, 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200', '2024-01-15', '2024-02-15', 'seasonal'),
('Новая коллекция весна-лето', 'Встречайте новую коллекцию со скидкой 20%', 20, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200', '2024-02-01', '2024-03-01', 'new-collection')
ON CONFLICT DO NOTHING;

