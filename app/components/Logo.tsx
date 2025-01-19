import Link from "next/link";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
        <img
          src="/icons/logo.svg"
          alt="Barcoblanco Logo"
          style={{ height: "40px", cursor: "pointer" }}
        />
      </Link>
    </Box>
  );
};

export default Logo;
