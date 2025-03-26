"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pagination } from "../../../components/ui/pagination";
import Product from "../../../components/ui/Product";

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

const categoryWidthFilters: { [key: string]: number[] } = {
  mirrors: [40, 50, 55, 60, 65, 70, 80, 90],
  wardrobe: [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100],
  cabinet: [50, 60, 70, 80],
  waterproof: [30, 35, 40, 50, 60],
};

export default function ProductsClient({
  products,
  selectedCategory,
}: ProductsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWidths, setSelectedWidths] = useState<number[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const ITEMS_PER_PAGE = 12;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const allCategories = ["mirrors", "wardrobe", "cabinet", "waterproof"];

  const categoryProducts = selectedCategory
    ? products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  const availableWidths = selectedCategory
    ? categoryWidthFilters[selectedCategory.toLowerCase()] || []
    : [];

  useEffect(() => {
    setSelectedWidths([]);
  }, [selectedCategory]);

  const filteredProducts = categoryProducts.filter((product) =>
    selectedWidths.length > 0 ? selectedWidths.includes(product.width || 0) : true
  );

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const isActive = (category: string) =>
    selectedCategory?.toLowerCase() === category.toLowerCase();

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4">
      {/* Категорії + Фільтр — мобільна версія */}
      <div className="block md:hidden space-y-4 mb-6">
        {/* Категорії */}
        <div className="overflow-x-auto flex gap-2">
          <Link href="/products">
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition ${
                !selectedCategory
                  ? "bg-[#1996A3] text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-[#1996A3] hover:text-white"
              }`}
            >
              Усі товари
            </button>
          </Link>
          {allCategories.map((category) => (
            <Link key={category} href={`/category/${category}`}>
              <button
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition ${
                  isActive(category)
                    ? "bg-[#1996A3] text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-[#1996A3] hover:text-white"
                }`}
              >
                {category === "mirrors" && "Дзеркала"}
                {category === "wardrobe" && "Шафи"}
                {category === "cabinet" && "Комоди"}
                {category === "waterproof" && "WATER"}
              </button>
            </Link>
          ))}
        </div>

        {/* Кнопка фільтра — справа зверху, тільки іконка */}
        {selectedCategory && availableWidths.length > 0 && (
          <div className="flex justify-end md:hidden mt-2 pr-2">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="p-2 bg-white border border-[#1996A3] text-[#1996A3] rounded-full shadow hover:bg-[#1996A3] hover:text-white transition"
              aria-label="Відкрити фільтр"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M6 12h12M10 18h4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Бокова панель — десктоп */}
        <div className="hidden md:block min-w-[250px] max-w-[300px] pr-6 mt-4 space-y-8">
          {/* Категорії */}
          <div>
            <h2 className="text-center bg-[#1996A3] text-white py-2 rounded-t-lg font-semibold">
              Категорії
            </h2>
            <div className="flex flex-col border rounded-b-lg">
              <Link href="/products">
                <button className={`w-full py-2 border-b text-left px-4 ${!selectedCategory ? "bg-[#1996A3] text-white" : "hover:bg-gray-100"}`}>
                  Усі товари
                </button>
              </Link>
              {allCategories.map((category) => (
                <Link key={category} href={`/category/${category}`}>
                  <button className={`w-full py-2 border-b text-left px-4 ${isActive(category) ? "bg-[#1996A3] text-white" : "hover:bg-gray-100"}`}>
                    {category === "mirrors" && "Дзеркала"}
                    {category === "wardrobe" && "Шафи"}
                    {category === "cabinet" && "Комоди"}
                    {category === "waterproof" && "WATER"}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Фільтр ширини */}
          {selectedCategory && availableWidths.length > 0 && (
            <div>
              <h2 className="text-center bg-[#1996A3] text-white py-2 rounded-t-lg font-semibold">
                Ширина
              </h2>
              <div className="p-4 border rounded-b-lg grid grid-cols-2 gap-2">
                {availableWidths.map((width) => (
                  <label key={width} className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="width"
                      checked={selectedWidths[0] === width}
                      onChange={() => setSelectedWidths([width])}
                      className="w-5 h-5"
                    />
                    <span>{width} см</span>
                  </label>
                ))}
                <button
                  onClick={() => setSelectedWidths([])}
                  className="text-sm text-[#1996A3] underline mt-2 col-span-2 text-center"
                >
                  Очистити
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Товари */}
        <div className="w-full flex-1 px-0 md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                Немає товарів, що відповідають вибраним фільтрам.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Пагінація */}
      <div className="w-full mt-12 flex justify-center">
        <Pagination
          totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Модальне вікно фільтра — мобілка */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
          <div className="w-[90%] max-w-xs bg-white h-full p-6 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#1996A3]">Фільтри</h2>
              <button onClick={() => setShowMobileFilter(false)} className="text-2xl">&times;</button>
            </div>
            <h3 className="font-semibold mb-2">Ширина</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableWidths.map((width) => (
                <label key={width} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="mobile-width"
                    checked={selectedWidths[0] === width}
                    onChange={() => setSelectedWidths([width])}
                    className="w-4 h-4"
                  />
                  <span>{width} см</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => setSelectedWidths([])}
              className="text-sm text-[#1996A3] underline mt-4"
            >
              Очистити
            </button>
            <button
              onClick={() => setShowMobileFilter(false)}
              className="mt-auto w-full bg-[#1996A3] text-white py-2 rounded mt-6"
            >
              Застосувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}










