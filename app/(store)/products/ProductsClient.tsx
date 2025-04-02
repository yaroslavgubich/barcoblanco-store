"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination } from "../../../components/ui/pagination";
import Product from "../../../components/ui/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// Тип товара
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

// Фильтры ширины по категориям
const categoryWidthFilters: { [key: string]: number[] } = {
  mirrors: [40, 50, 55, 60, 65, 70, 80, 90],
  wardrobe: [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100],
  cabinet: [50, 60, 70, 80],
  waterproof: [30, 35, 40, 50, 60],
};

// Названия категорий для отображения
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
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Фильтр по ширине
  const [selectedWidths, setSelectedWidths] = useState<number[]>([]);

  // Мобильное отображение фильтра (по ширине)
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Количество товаров
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Сообщение об успехе
  const [successMessage, setSuccessMessage] = useState("");

  // Контекст корзины
  const { addToCart } = useCart();

  // Список всех категорий
  const allCategories = ["mirrors", "wardrobe", "cabinet", "waterproof"];

  // Отфильтрованные по категории товары
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

  // При смене категории сбрасываем фильтр по ширине
  useEffect(() => {
    setSelectedWidths([]);
  }, [selectedCategory]);

  const toggleWidth = (width: number) => {
    setSelectedWidths((prev) =>
      prev.includes(width) ? prev.filter((w) => w !== width) : [...prev, width]
    );
  };

  // Фильтрация товаров (по ширине)
  const filteredProducts = categoryProducts.filter((product) => {
    const matchWidth =
      selectedWidths.length > 0
        ? selectedWidths.includes(product.width || 0)
        : true;
    return matchWidth;
  });

  // Товары для текущей страницы
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const isActive = (category: string) =>
    selectedCategory?.toLowerCase() === category.toLowerCase();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity < 1 ? 1 : newQuantity,
    }));
  };

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

  const handleClearFilters = () => {
    setSelectedWidths([]);
  };

  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      {/* Мобильное меню для фильтра и категорий */}
      <div className="md:hidden bg-100 flex flex-wrap justify-center w-full px-4 mb-4 mt-4 gap-6">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 bg-[#4FA7B9] hover:bg-[#1996A3] text-white rounded-lg transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16M4 9h16" />
          </svg>
          <span>Фільтр</span>
        </button>
        <div className="relative flex-1 min-w-[150px]">
          <button
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 text-gray-800 rounded-lg transition"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>
              {selectedCategory
                ? categoryLabels[selectedCategory] || selectedCategory
                : "Категорії"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showCategories && (
            <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-10">
              <Link
                href="/products"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-[#1996A3] hover:text-white transition ${
                  !selectedCategory ? "bg-[#1996A3] text-white" : ""
                }`}
              >
                Усі товари
              </Link>
              {allCategories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-[#1996A3] hover:text-white transition ${
                    isActive(category) ? "bg-[#1996A3] text-white" : ""
                  }`}
                >
                  {categoryLabels[category] || category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Категории для десктопа */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6 mt-6 justify-center">
        <Link href="/products">
          <button
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition border border-[#1996A3] ${
              !selectedCategory
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
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border border-[#1996A3] ${
                isActive(category)
                  ? "bg-[#1996A3] text-white"
                  : "bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white"
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          </Link>
        ))}
      </div>

      {/* Мобильный фильтр (выезжающая панель) */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-[90%] max-w-xs bg-white h-full p-5 shadow-lg flex flex-col">
            {/* Шапка модалки */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#1996A3]">Фільтри</h2>
              <button onClick={() => setShowMobileFilter(false)} className="text-2xl">
                &times;
              </button>
            </div>
            {/* Фильтр по ширине (мобильный) */}
            {availableWidths.length > 0 && (
              <>
                <h3 className="font-medium mb-2">Ширина</h3>
                <div className="flex flex-col space-y-2 mb-4">
                  {availableWidths.map((width) => (
                    <label key={width} className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedWidths.includes(width)}
                        onChange={() => toggleWidth(width)}
                        className="peer hidden"
                      />
                      <span className="w-4 h-4 border-2 border-[#1996A3] rounded flex items-center justify-center transition hover:bg-[#1996A3] hover:text-white peer-checked:bg-[#1996A3] peer-checked:text-white">
                        <span className="w-2 h-2 bg-white opacity-0 peer-checked:opacity-100 transition-opacity rounded-sm" />
                      </span>
                      <span>{width} см</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Убрали фильтр по цене */}

            {/* Кнопка сброса */}
            <button onClick={handleClearFilters} className="text-sm text-[#1996A3] underline">
              Очистити
            </button>
            {/* Кнопка закрытия модалки */}
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
          <div className="flex bg-gray flex-col md:flex-row gap-4">
            {/* Левая колонка (десктоп) */}
            <div className="hidden md:block w-fit bg-white border border-gray-200 rounded-lg p-4 h-min">
              {availableWidths.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-[#1996A3] mb-2">Ширина</h3>
                  <div className="flex flex-col space-y-2">
                    {availableWidths.map((width) => (
                      <label key={width} className="flex items-center space-x-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedWidths.includes(width)}
                          onChange={() => toggleWidth(width)}
                          className="peer hidden"
                        />
                        <span className="w-4 h-4 border-2 border-[#1996A3] rounded flex items-center justify-center transition hover:bg-[#1996A3] hover:text-white peer-checked:bg-[#1996A3] peer-checked:text-white">
                          <span className="w-2 h-2 bg-white opacity-0 peer-checked:opacity-100 transition-opacity rounded-sm" />
                        </span>
                        <span>{width} см</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Убрали фильтр по цене */}
              <button onClick={handleClearFilters} className="text-sm text-[#1996A3] underline">
                Очистити
              </button>
            </div>

            {/* Правая колонка: список товаров */}
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
                          <div>
                            <Product product={product} />
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="whitespace-nowrap text-base sm:text-lg md:text-xl font-normal text-[#1996A3]">
                              ₴{product.price}
                            </span>
                            <Button
                              onClick={() => handleAddToCart(product)}
                              className="bg-[#4FA7B9] hover:bg-[#1996A3] text-white px-3 py-2 rounded-md transition flex items-center justify-center"
                            >
                              <img src="/icons/cart.png" alt="Cart" className="w-5 h-5" />
                            </Button>
                          </div>
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

      {/* Сообщение об успехе */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-4 right-4 bg-white border border-[#1996A3] text-[#1996A3] px-6 py-4 shadow-xl rounded-lg text-xl z-50"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}









































