import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner}</p>
        <h3>{heroBanner}</h3>
        <h1>{heroBanner}</h1>
        {/* <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        /> */}

        <div>
          <Link href={`/product/${heroBanner}`}>
            <button type="button">Order</button>
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
