import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
        <Image
          src="/icons/logo.svg"
          alt="Barcoblanco Logo"
          width={100} // Adjust as per design
          height={40} // Adjust as per design
          style={{ cursor: "pointer" }}
        />
      </Link>
    </Box>
  );
};

export default Logo;
