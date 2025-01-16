import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  if (!heroBanner) {
    return <div>Error: No banner data available</div>;
  }

  return (
    <div className="hero-banner-container">
      {/* Left Banner Section */}
      <div className="hero-banner-container-left">
        <h1 className="hero-banner-title">
          {heroBanner.largeText1 || heroBanner.largeText2 || "Default Title"}
        </h1>
        <h3 className="hero-banner-subtitle">
          {heroBanner.midText || "Default Subtitle"}
        </h3>
        <div className="hero-banner-container-lower">
          <Link href={`/product/${heroBanner.product || "default-product"}`}>
            <button className="order-button" type="button">
              {heroBanner.buttonText || "Order Now"}
            </button>
          </Link>
        </div>
      </div>

      {/* Right Banner Section */}
      <div className="hero-banner-container-right">
        {heroBanner.image && heroBanner.image.asset && (
          <img
            src={urlFor(heroBanner.image).url()}
            alt="Hero Banner"
            className="hero-banner-image"
          />
        )}
      </div>
    </div>
  );
};

export default HeroBanner;



