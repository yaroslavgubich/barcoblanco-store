"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex text-decoration-none">
        <Image
          src="/icons/logo.svg"
          alt="Barcoblanco Logo"
          width={100} // Adjust dimensions as per design
          height={40}
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Logo;
