//app/(store)/products/page
"use client";

import { useState } from "react";
import { CategoryFilter } from "../../../components/ui/category-filter";
import { ProductCard } from "../../../components/ui/product-card";
import { WidthFilter } from "../../../components/ui/width-filter";
import { Pagination } from "../../../components/ui/pagination";

const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];
const allProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  category: `Category ${(i % 4) + 1}`, // This will distribute products across all 4 categories
}));

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Category 1");
  const [widthRange, setWidthRange] = useState<[number, number]>([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredProducts = allProducts.filter(
    (product) => activeCategory === product.category
  );
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="space-y-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Filters:</h2>
          <WidthFilter value={widthRange} onValueChange={setWidthRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
            />
          ))}
        </div>

        <Pagination
          totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
