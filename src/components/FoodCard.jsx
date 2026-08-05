import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-lg-4 col-md-6">
      <div
        className="card border-0 shadow h-100"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          transition: ".3s",
        }}
      >
        <img
          src={food.image}
          alt={food.name}
          style={{
            height: "230px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">

          <h4 className="fw-bold">
            {food.name}
          </h4>

          <p className="text-muted">
            {food.description}
          </p>

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="text-danger">
              ₹{food.price}
            </h4>

            <button
              className="btn btn-warning rounded-pill px-4"
              onClick={() => addToCart(food)}
            >
              Add
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default FoodCard;
