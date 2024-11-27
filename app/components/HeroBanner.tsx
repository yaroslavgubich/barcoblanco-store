import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner}SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <h1>LARGE TEXT</h1>

        {heroBanner && heroBanner.image && (
          <img
            src={urlFor(heroBanner.image).url()}
            alt="Hero Banner"
            className="hero-banner-image"
          />
        )}

        <div className="hero-banner-container-lower">
          <Link href={`/product/${heroBanner}`}>
            <button className="order-button" type="button">
              Order
            </button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
