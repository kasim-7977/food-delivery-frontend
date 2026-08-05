import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import './FoodCard.css';

function FoodCard({ food }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="col-md-4 mb-4">
      <div className="comedy">
      <img
  src={food.image}
  alt={food.name}
  className="card-img-top"
  style={{ height: "200px", objectFit: "cover" }}
/>

      <div className="card-body">
        <h5>{food.name}</h5>

        <p>{food.category_name}</p>

        <h6>₹{food.price}</h6>
<button
  className="btn btn-primary"
  onClick={() => addToCart(food)}
>
  Add To Cart
</button>
      </div>
      </div>  
    </div>
  );
}

export default FoodCard;
