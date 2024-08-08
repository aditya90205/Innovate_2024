import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { cartItem } from "../types/types";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: cartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  return <div className="product-card">
     <img src={`${server}/${photo}`} alt={name} />
     <p>{name}</p>
     <span>₹{price}</span>

     <div>
        <button onClick={() => handler({productId, photo, name, price, quantity:1, stock})}><FaPlus/></button>
     </div>
  </div>;
};

export default ProductCard;
