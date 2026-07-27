import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">

      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="card p-3 mb-2"
        >
          <h5>{item.name}</h5>

          <p>Qty:{item.quantity}</p>

          <p>₹{item.price}</p>

<div className="d-flex gap-2">

  <button
    className="btn btn-success"
    onClick={() => increaseQuantity(item.id)}
  >
    +
  </button>

  <button
    className="btn btn-warning"
    onClick={() => decreaseQuantity(item.id)}
  >
    -
  </button>

  <button
    className="btn btn-danger"
    onClick={() => removeItem(item.id)}
  >
    Remove
  </button>

</div>

        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <Link
  to="/checkout"
  className="btn btn-primary"
>
  Checkout
</Link>

    </div>
  );
}

export default Cart;