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

// Фиксированные фильтры ширины для каждой категории
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedWidths, setSelectedWidths] = useState<number[]>([]);

  const ITEMS_PER_PAGE = 12;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

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
    <div className="container mx-auto py-8 px-4">
      {/* Категории */}
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        <Link href="/products">
          <button
            className={`px-5 py-2 rounded transition ${!selectedCategory
                ? "bg-[#1996A3] text-white shadow-lg"
                : "bg-gray-400 text-white hover:bg-[#1996A3]"
              }`}
          >
            Усі товари
          </button>
        </Link>

        {["mirrors", "wardrobe", "cabinet", "waterproof"].map((category) => (
          <Link key={category} href={`/category/${category}`}>
            <button
              className={`px-5 py-2 rounded transition ${isActive(category)
                  ? "bg-[#1996A3] text-white shadow-lg"
                  : "bg-gray-400 text-white hover:bg-[#1996A3]"
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

      {/* Фильтры и Товары */}
      <div className={`flex ${selectedCategory ? "" : "justify-center"}`}>
        {/* Фильтр ширины */}
        {selectedCategory && availableWidths.length > 0 && (
          <div className="w-1/6 pr-4 mt-4">
            <h2 className="text-center bg-[#1996A3] text-white py-2 rounded-t-lg font-semibold">
              Ширина
            </h2>
            <div className="p-4 border rounded-b-lg grid grid-cols-2 gap-2">
              {availableWidths.map((width) => (
                <label key={width} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="width"
                    checked={selectedWidths[0] === width}
                    onChange={() => setSelectedWidths([width])}
                    className="w-4 h-4"
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

        {/* Товары */}
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-4 text-gray-500">
                Немає товарів, що відповідають вибраним фільтрам.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Пагинация по центру */}
      <div className="w-full mt-12 flex justify-center">
        <Pagination
          totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}









