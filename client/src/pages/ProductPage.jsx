import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Truck, Shield, RefreshCw, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/mockData';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Навигация */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-primary-600">Каталог</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            {/* Главное изображение */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  -{product.discount}%
                </div>
              )}
              <button className="absolute top-6 left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-lg group">
                <Heart className="w-6 h-6 text-gray-700 group-hover:fill-red-500 group-hover:text-red-500 transition" />
              </button>
            </motion.div>

            {/* Миниатюры */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-4 ring-primary-500 shadow-lg scale-105'
                      : 'ring-2 ring-gray-200 hover:ring-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <Check className="w-4 h-4" /> В наличии
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Нет в наличии</span>
                )}
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">{product.name}</h1>
              
              {/* Рейтинг */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} отзывов)</span>
              </div>

              {/* Цена */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-bold text-gradient">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
            </div>

            {/* Выбор цвета */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Цвет: <span className="text-primary-600">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg scale-105'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Размер</h3>
                <button className="text-primary-600 font-medium hover:underline">Таблица размеров</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-500 text-white shadow-lg scale-105'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Количество */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Количество</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3 pt-6">
              <button
                disabled={!selectedSize}
                className="w-full py-5 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-6 h-6" />
                Добавить в корзину
              </button>
              <button className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all hover:shadow-xl">
                Купить сейчас
              </button>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium">Доставка 1-3 дня</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium">Возврат 14 дней</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium">Гарантия качества</p>
              </div>
            </div>
          </div>
        </div>

        {/* Табы с информацией */}
        <div className="mt-20">
          <div className="border-b">
            <div className="flex gap-8">
              {['description', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-semibold text-lg transition-all ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' && 'Описание'}
                  {tab === 'details' && 'Характеристики'}
                  {tab === 'reviews' && 'Отзывы'}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700">{product.description}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-medium">Материал:</span>
                    <span className="text-gray-600">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-medium">Уход:</span>
                    <span className="text-gray-600">{product.care}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-medium">Категория:</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <p className="text-gray-600">Отзывы покупателей скоро появятся здесь</p>
              </div>
            )}
          </div>
        </div>

        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold mb-8">Вам может понравиться</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary-600">
                          {relatedProduct.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

