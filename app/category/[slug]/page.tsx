"use client";

import React, { useState } from "react";
import { client } from "../../lib/client";
import { categoryProductQuery } from "../../sanity_barcoblanco/queries/categoryProductQuery";
import Product from "../../components/Product";
import { Pagination } from "@mui/material";

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export default function CategoryPage({ params, searchParams }: Props) {
  const { slug } = params;
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.page || "1", 10)
  );
  const productsPerPage = 20; // Updated to 20 products per page

  // Fetch products for the category
  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(categoryProductQuery(slug));
      setProductsData(data);
    };
    fetchProducts();
  }, [slug]);

  // Pagination indices
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Products in {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {currentProducts.length > 0 ? (
          currentProducts.map((product: any) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No products found for this category.
          </p>
        )}
      </div>

      {/* Pagination */}
      {productsData.length > productsPerPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <Pagination
            count={Math.ceil(productsData.length / productsPerPage)} // Total pages
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)} // Update current page
            color="primary"
          />
        </div>
      )}
    </div>
  );
}
