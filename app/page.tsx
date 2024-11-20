import { Product, HeroBanner } from "./components";
const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Popular Products</h2>
      </div>
      <div className="procuts-container">{["product 1", "product 2"]}</div>
      Footer
    </>
  );
};

export default Home;
