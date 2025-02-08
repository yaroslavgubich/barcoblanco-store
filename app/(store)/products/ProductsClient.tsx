"use client";

import { useMemo, useState } from "react";
import { WidthFilter } from "../../../components/ui/width-filter";
import { Pagination } from "../../../components/ui/pagination";
import Product from "../../../components/ui/Product";

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
  selectedCategory?: string;
}

export default function ProductsClient({ products, selectedCategory }: ProductsClientProps) {
  const [widthRange, setWidthRange] = useState<[number, number]>([0, 200]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 9;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productWidth = product.width ?? 0;
      return productWidth >= widthRange[0] && productWidth <= widthRange[1];
    });
  }, [products, widthRange]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {selectedCategory ? `Категорія: ${selectedCategory}` : "Продукти"}
      </h1>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Фільтр ширини:</h2>
          <WidthFilter value={widthRange} onValueChange={setWidthRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <Product key={product._id} product={product} />
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
