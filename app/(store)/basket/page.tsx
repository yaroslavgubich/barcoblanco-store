import type { FC } from "react"
import { Typography, Container, Box } from "@mui/material"

const BasketPage: FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Basket
        </Typography>
        {/* Add basket items and checkout functionality here */}
        <Typography>Your basket is currently empty.</Typography>
      </Box>
    </Container>
  )
}

export default BasketPage

