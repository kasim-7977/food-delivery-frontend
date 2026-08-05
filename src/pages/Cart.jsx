import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + delivery - discount;

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3">🛒 Your Cart is Empty</h2>
        <p className="text-muted">
          Looks like you haven't added anything yet.
        </p>

        <Link to="/menu" className="btn btn-warning mt-3">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">

        {/* Cart Items */}

        <div className="col-lg-8">

          <h2 className="fw-bold mb-4">
            🛒 My Cart
          </h2>

          {cart.map((item) => (
            <div
              className="card shadow border-0 mb-4"
              key={item.id}
            >
              <div className="row g-0">

                <div className="col-md-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>
                        <h4>{item.name}</h4>

                        <p className="text-muted mb-1">
                          ₹{item.price}
                        </p>

                        <h5 className="text-success">
                          ₹{item.price * item.quantity}
                        </h5>

                      </div>

                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>

                    </div>

                    <div className="d-flex align-items-center mt-3">

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span className="mx-3 fw-bold fs-5">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Summary */}

        <div className="col-lg-4">

          <div
            className="card shadow border-0"
            style={{ position: "sticky", top: "90px" }}
          >

            <div className="card-body">

              <h3 className="fw-bold mb-4">
                Order Summary
              </h3>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Delivery</span>
                <span>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Discount</span>
                <span className="text-success">
                  -₹{discount}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <h4>Total</h4>

                <h4 className="text-danger">
                  ₹{total}
                </h4>

              </div>

              <Link
                to="/checkout"
                className="btn btn-warning w-100 mt-4 py-3 fw-bold"
              >
                Proceed to Checkout →
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;
