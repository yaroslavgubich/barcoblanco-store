"use client";
import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product, addToCart }) => {
const { image = [], name, slug, price } = product;

const imageUrl = image.length > 0 ? urlFor(image[0]) : "/images/placeholder.svg";

const handleAddToCart = (e) => {
e.preventDefault(); // Останавливаем переход по ссылке
addToCart(product); // Добавляем товар в корзину
};

return (
<div className="product">
<Link href={`/product/${slug.current}`}>
<div className="product-card">
<div className="product-image-wrapper">
<img src={imageUrl} alt={name} className="product-image" />
<div className="product-cart-icon" onClick={handleAddToCart}>
<img src="/icons/cart.png" alt="Add to cart" />
</div>
</div>
<p className="product-name">{name}</p>
<p className="product-price">{price} грн</p>
</div>
</Link>
</div>
);
};

export default Product;
