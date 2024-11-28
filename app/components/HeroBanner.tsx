import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  if (!heroBanner) {
    return <div>Error: No banner data available</div>;
  }

  
  return (
    <div className="hero-banner-container">
      <div>
        {/* Render SmallText */}
        <p className="beats-solo">
          {heroBanner.smallText ? heroBanner.smallText : "Error ⚠️"} 
        </p>

        {/* Render MidText and LargeText */}
        <h3>{heroBanner.midText || "error"}</h3>
        <h1>{heroBanner.largeText1 || heroBanner.largeText2 || "error"}</h1>

        {/* Render Image */}
        {heroBanner.image && heroBanner.image.asset && (
          <img
            src={urlFor(heroBanner.image).url()}
            alt="Hero Banner"
            className="hero-banner-image"
          />
        )}

        <div className="hero-banner-container-lower">
          {/* Link to a specific product using a valid identifier */}
          <Link href={`/product/${heroBanner.product || "default-product"}`}>
            <button className="order-button" type="button">
              {heroBanner.buttonText || "Order"}
            </button>
          </Link>

          {/* Render Description */}
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc || "No description available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
