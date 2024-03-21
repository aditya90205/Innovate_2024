import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="asda"
          name="Macbook"
          price={12000}
          stock={5}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71vFKBpKakL._SX522_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
