"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "../../../components/ui/category-filter";
import { WidthFilter } from "../../../components/ui/width-filter";
import { Pagination } from "../../../components/ui/pagination";
import Product from "../../../components/ui/Product";

// These should match possible categories from your Sanity data.
// Alternatively, you can dynamically extract them from products themselves.
const categories = ["mirrors", "wardrobe", "cabinet", "waterproof"];

interface ProductType {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  details?: string;
  category?: string;
  width?: number;
  image?: { asset: { url: string } }[];
}

interface ProductsClientProps {
  products: ProductType[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  // React state for filters
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [widthRange, setWidthRange] = useState<[number, number]>([0, 200]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 9;

  // Filtering logic:
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = product.category === activeCategory;

      // For width, if not defined on product, ignore. Adjust logic if needed:
      const productWidth = product.width ?? 0;
      const matchWidth =
        productWidth >= widthRange[0] && productWidth <= widthRange[1];

      return matchCategory && matchWidth;
    });
  }, [products, activeCategory, widthRange]);

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // If you have a ton of categories, you could also dynamically derive them from `products`.
  // For instance:
  // const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="space-y-6">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1); // reset to page 1 on category change
          }}
        />

        {/* Width Range Filter */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Filters:</h2>
          <WidthFilter
            value={widthRange}
            onValueChange={(range) => {
              setWidthRange(range);
              setCurrentPage(1); // reset to page 1 on width change
            }}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
