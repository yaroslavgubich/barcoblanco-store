"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination } from "../../../components/ui/pagination";
import Product from "../../../components/ui/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductType {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  width?: number;
  category?: string;
  image?: { asset: { url: string } }[];
}

interface ProductsClientProps {
  products: ProductType[];
  selectedCategory?: string;
}

// Ширины по категориям
const categoryWidthFilters: { [key: string]: number[] } = {
  mirrors: [40, 50, 55, 60, 65, 70, 80, 90],
  wardrobe: [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100],
  cabinet: [50, 60, 70, 80],
  waterproof: [30, 35, 40, 50, 60],
};

// Названия категорий для вывода
const categoryLabels: Record<string, string> = {
  mirrors: "Дзеркала",
  wardrobe: "Шафи",
  cabinet: "Комоди",
  waterproof: "WATER",
};

export default function ProductsClient({
  products,
  selectedCategory,
}: ProductsClientProps) {
  // ------ Пагинация ------
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // ------ Фильтры ------
  // Фильтр по ширине
  const [selectedWidths, setSelectedWidths] = useState<number[]>([]);

  // Один ползунок для максимальной цены
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  // ------ Мобильное отображение фильтра ------
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ------ Количество товаров ------
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // ------ Сообщение об успехе ------
  const [successMessage, setSuccessMessage] = useState("");

  // ------ Контекст корзины ------
  const { addToCart } = useCart();

  // Список всех категорий
  const allCategories = ["mirrors", "wardrobe", "cabinet", "waterproof"];

  // Отфильтрованные по категории
  const categoryProducts = selectedCategory
    ? products.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    : products;

  // Доступные ширины в текущей категории
  const availableWidths = selectedCategory
    ? categoryWidthFilters[selectedCategory.toLowerCase()] || []
    : Array.from(new Set(Object.values(categoryWidthFilters).flat())).sort(
      (a, b) => a - b
    );

  // При смене категории сбрасываем фильтры
  useEffect(() => {
    setSelectedWidths([]);
    setMaxPrice(10000);
  }, [selectedCategory]);

  // Установка/снятие конкретной ширины
  const toggleWidth = (width: number) => {
    setSelectedWidths((prev) =>
      prev.includes(width) ? prev.filter((w) => w !== width) : [...prev, width]
    );
  };

  // Главная логика фильтрации (по ширине и цене)
  const filteredProducts = categoryProducts.filter((product) => {
    const matchWidth =
      selectedWidths.length > 0
        ? selectedWidths.includes(product.width || 0)
        : true;

    // Условие: product.price <= maxPrice
    const matchPrice = product.price <= maxPrice;

    return matchWidth && matchPrice;
  });

  // Товары для текущей страницы
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Активна ли конкретная категория (для подсветки кнопки)
  const isActive = (category: string) =>
    selectedCategory?.toLowerCase() === category.toLowerCase();

  // Изменение количества
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity < 1 ? 1 : newQuantity,
    }));
  };

  // Добавление товара в корзину
  const handleAddToCart = (product: ProductType) => {
    const quantity = quantities[product._id] || 1;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image?.[0]?.asset.url || "/images/placeholder.svg",
      quantity,
    });

    setSuccessMessage("Товар успішно доданий до кошика!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Очистка всех фильтров
  const handleClearFilters = () => {
    setSelectedWidths([]);
    setMaxPrice(10000);
  };

  // ------ Обработчики изменения цены ------
  // При движении ползунка
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };
  // При вводе вручную
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typed = Number(e.target.value);
    // Не даём вводить меньше нуля
    setMaxPrice(typed < 0 ? 0 : typed);
  };

  return (
    <>
      {/* Кнопка «Фільтр» (для мобильных) */}
      <div className="md:hidden flex justify-end w-full px-4 mb-4">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="p-2 bg-white border border-[#1996A3] text-[#1996A3] rounded-full shadow hover:bg-[#1996A3] hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M10 18h4" />
          </svg>
        </button>
      </div>

      {/* Мобильный фильтр (выезжающая панель) */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-[90%] max-w-xs bg-white h-full p-5 shadow-lg flex flex-col">
            {/* Шапка модалки */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#1996A3]">Фільтри</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Фильтр по ширине (мобильный) */}
            {availableWidths.length > 0 && (
              <>
                <h3 className="font-medium mb-2">Ширина</h3>
                <div className="flex flex-col space-y-2 mb-4">
                  {availableWidths.map((width) => (
                    <label
                      key={width}
                      className="flex items-center space-x-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedWidths.includes(width)}
                        onChange={() => toggleWidth(width)}
                        className="peer hidden"
                      />
                      <span
                        className="
                          w-4 h-4 border-2 border-[#1996A3] 
                          rounded flex items-center justify-center 
                          transition 
                          hover:bg-[#1996A3] hover:text-white
                          peer-checked:bg-[#1996A3] peer-checked:text-white
                        "
                      >
                        <span
                          className="
                            w-2 h-2 bg-white
                            opacity-0 peer-checked:opacity-100
                            transition-opacity 
                            rounded-sm
                          "
                        />
                      </span>
                      <span>{width} см</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Фильтр по цене (один ползунок + ввод вручную) */}
            <h3 className="font-medium mb-2">Ціна</h3>
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              {/* Поле ввода */}
              <div className="flex items-center gap-2">
                <label>До:</label>
                <input
                  type="number"
                  min={0}
                  className="w-20 p-1 border rounded"
                  value={maxPrice}
                  onChange={handleInputChange}
                />
                <span>грн</span>
              </div>
              {/* Ползунок */}
              <input
                type="range"
                min={0}
                max={10000}
                step={50}
                value={maxPrice}
                onChange={handleSliderChange}
                className="
                  w-full cursor-pointer 
                  accent-[#1996A3]
                  appearance-none h-1 rounded-lg bg-gray-200 
                  [&::-webkit-slider-runnable-track]:bg-[#1996A3] 
                  [&::-moz-range-track]:bg-[#1996A3]
                "
              />
            </div>

            {/* Кнопка сброса */}
            <button
              onClick={handleClearFilters}
              className="text-sm text-[#1996A3] underline"
            >
              Очистити
            </button>

            {/* Закрыть модалку (Применить) */}
            <button
              onClick={() => setShowMobileFilter(false)}
              className="mt-auto w-full bg-[#1996A3] text-white py-2 rounded mt-6 transition hover:opacity-90"
            >
              Застосувати
            </button>
          </div>
        </div>
      )}

      {/* Основная часть */}
      <div className="w-full bg-gray-50 py-4 px-2">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Блок категорий (центрируем) */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <Link href="/products">
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border border-[#1996A3] ${!selectedCategory
                  ? "bg-[#1996A3] text-white"
                  : "bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white"
                  }`}
              >
                Усі товари
              </button>
            </Link>
            {allCategories.map((category) => (
              <Link key={category} href={`/category/${category}`}>
                <button
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border border-[#1996A3] ${isActive(category)
                    ? "bg-[#1996A3] text-white"
                    : "bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white"
                    }`}
                >
                  {categoryLabels[category] || category}
                </button>
              </Link>
            ))}
          </div>

          {/* Контейнер: фильтры слева, товары справа (только на десктопе) */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Левая колонка (десктоп) */}
            <div className="hidden md:block w-fit bg-white border border-gray-200 rounded-lg p-4 h-min">
              {/* Фильтр по ширине */}
              {availableWidths.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-[#1996A3] mb-2">
                    Ширина
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {availableWidths.map((width) => (
                      <label
                        key={width}
                        className="flex items-center space-x-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWidths.includes(width)}
                          onChange={() => toggleWidth(width)}
                          className="peer hidden"
                        />
                        <span
                          className="
                            w-4 h-4 border-2 border-[#1996A3] 
                            rounded flex items-center justify-center 
                            transition 
                            hover:bg-[#1996A3] hover:text-white
                            peer-checked:bg-[#1996A3] peer-checked:text-white
                          "
                        >
                          <span
                            className="
                              w-2 h-2 bg-white
                              opacity-0 peer-checked:opacity-100
                              transition-opacity 
                              rounded-sm
                            "
                          />
                        </span>
                        <span>{width} см</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Фильтр по цене: один ползунок + ручной ввод (десктоп) */}
              <div className="mb-6 text-sm text-gray-600 space-y-3">
                <h3 className="font-medium text-sm text-[#1996A3] mb-1">
                  Ціна
                </h3>

                {/* Поле ввода */}
                <div className="flex items-center gap-2">
                  <label>До:</label>
                  <input
                    type="number"
                    min={0}
                    className="w-20 p-1 border rounded"
                    value={maxPrice}
                    onChange={handleInputChange}
                  />
                  <span>грн.</span>
                </div>

                {/* Ползунок */}
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={50}
                  value={maxPrice}
                  onChange={handleSliderChange}
                  className="
                    w-full cursor-pointer 
                    accent-[#1996A3]
                    appearance-none h-1 rounded-lg bg-gray-200 
                    [&::-webkit-slider-runnable-track]:bg-[#1996A3] 
                    [&::-moz-range-track]:bg-[#1996A3]
                  "
                />
              </div>

              {/* Кнопка очистки */}
              <button
                onClick={handleClearFilters}
                className="text-sm text-[#1996A3] underline"
              >
                Очистити
              </button>
            </div>

            {/* Правая колонка: товары */}
            {/* Правая колонка: товары */}
            <div className="flex-1">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
                <AnimatePresence>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => {
                      const quantity = quantities[product._id] || 1;

                      return (
                        <motion.div
                          key={product._id}
                          className="w-full bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] p-3 flex flex-col justify-between"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Карточка товара */}
                          <div>
                            <Product product={product} />
                          </div>

                          {/* Цена, счётчик, кнопка */}
                          <div className="mt-2 flex flex-wrap items-center justify-between min-h-[50px] gap-2">
                            <span className="whitespace-nowrap text-base sm:text-lg md:text-xl font-normal text-[#1996A3]">
                              {product.price} грн
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleQuantityChange(product._id, quantity - 1)}
                                className="bg-[#4FA7B9] text-white text-xs font-normal w-6 h-6 rounded hover:opacity-90 transition flex items-center justify-center"
                              >
                                –
                              </button>
                              <span className="text-xs font-normal w-5 text-center">{quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(product._id, quantity + 1)}
                                className="bg-[#4FA7B9] text-white text-xs font-normal w-6 h-6 rounded hover:opacity-90 transition flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Кнопка «Додати в кошик» (растянутая) */}
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#4FA7B9] hover:bg-[#1996A3] text-white text-xs sm:text-sm font-normal
                           w-full mt-2 px-3 py-2 rounded-md transition"
                          >
                            Додати в кошик
                          </Button>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-full flex justify-center items-center">
                      <p className="text-center text-gray-500">
                        Немає товарів, що відповідають вибраним фільтрам.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Пагинация */}
              <div className="w-full mt-6 flex justify-center">
                <Pagination
                  totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Сообщение об успехе (внизу) */}
      {successMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-500 bg-[#1996A3] text-white text-center py-2 z-50">
          {successMessage}
        </div>
      )}
    </>
  );
}






































