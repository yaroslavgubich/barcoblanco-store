import React from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Order a Call</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          console.log("Cart button clicked");
        }}
      >
        <FiShoppingCart />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
