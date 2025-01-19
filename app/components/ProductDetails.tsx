import React from "react";

interface ProductType {
  id: string;
  name: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  category: string;
  isPopular: boolean;
}

interface ProductProps {
  product: ProductType;
  isDetailPage?: boolean;
}

const Product: React.FC<ProductProps> = ({ product, isDetailPage = false }) => {
  const { image, name, price, description, category, isPopular } = product;

  return (
    <div>
      {isDetailPage ? (
        <div className="product-details">
          <img
            src={image.src}
            alt={image.alt}
            width={400}
            height={400}
            className="product-image"
          />
          <h1 className="product-name">{name}</h1>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
          <p className="product-category">Category: {category}</p>
          <p className="product-popular">Popular: {isPopular ? "Yes" : "No"}</p>
        </div>
      ) : (
        <div className="product-card">
          <img
            src={image.src}
            alt={image.alt}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      )}
    </div>
  );
};

export default Product;
