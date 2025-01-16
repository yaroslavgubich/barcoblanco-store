import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  if (!heroBanner) {
    return <div>Error: No banner data available</div>;
  }

  return (
    <div className="hero-banner-container">




        <div className="hero-banner-container-left">
          <h1>{heroBanner.largeText1 || heroBanner.largeText2 || "error"}</h1>
          <h3>{heroBanner.midText || "error"}</h3>
          <p className="banner-small-text">
            {heroBanner.smallText ? heroBanner.smallText : "Error ⚠️"}
          </p>
            <div className="hero-banner-container-lower">
              <Link href={`/product/${heroBanner.product || "default-product"}`}>
                <button className="order-button" type="button">
                  {heroBanner.buttonText || "Order"}
                </button>
              </Link>
            </div>
        </div>


          
          {/* Right banner container */}
        <div className="hero-banner-container-right">
          {heroBanner.image && heroBanner.image.asset && (
            <img
            src={urlFor(heroBanner.image).url()}
            alt="Hero Banner"
            className="hero-banner-image"
            />
          )}
            {/* Render Description */}
            <div className="desc">
              <p>{heroBanner.desc || "No description available"}</p>
            </div>
        </div>
    </div>
  );
};

export default HeroBanner;
