import React from "react";
import Link from "next/link";
// import Image from "next/image";
// import { urlFor } from "../../sanity/lib/client";

interface HeroBannerImage {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
  };
}

interface HeroBannerProps {
  heroBanner: {
    largeText1?: string;
    largeText2?: string;
    midText?: string;
    product?: string;
    buttonText?: string;
    image?: HeroBannerImage;
    desc?: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
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
      {/* <div className="hero-banner-container-right">
        {heroBanner.image && heroBanner.image.asset && (
          <Image
            src={urlFor(heroBanner.image).url() || "/default-image.jpg"}
            alt="Hero Banner"
            className="hero-banner-image"
            width={500} // Adjust as per design
            height={500} // Adjust as per design
          />
        )}
        {/* Render Description */}
      <div className="desc">
        <p>{heroBanner.desc || "No description available"}</p>
      </div>{" "}
      */
    </div>
  );
};

export default HeroBanner;
