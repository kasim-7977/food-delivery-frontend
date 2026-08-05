import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + delivery - discount;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("place-order/", {
        user: 2,
        full_name: form.full_name,
        mobile: form.mobile,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        total_amount: total,
        items: cart.map((item) => ({
          food: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      alert("🎉 Order Placed Successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to Place Order");
    }
  };

  return (
    <div className="container py-5">

      <div className="row">

        {/* Delivery Form */}

        <div className="col-lg-8">

          <div className="card shadow border-0 p-4">

            <h2 className="fw-bold mb-4">
              📍 Delivery Details
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                required
              />

              <textarea
                className="form-control mb-3"
                rows="3"
                name="address"
                placeholder="Complete Address"
                onChange={handleChange}
                required
              />

              <div className="row">

                <div className="col-md-6">
                  <input
                    className="form-control mb-3"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control mb-3"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <h4 className="mt-4 mb-3">
                💳 Payment Method
              </h4>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked
                  readOnly
                />

                <label className="form-check-label">
                  Cash on Delivery
                </label>
              </div>

              <button
                className="btn btn-success w-100 mt-4 py-3 fw-bold"
                type="submit"
              >
                Place Order
              </button>

            </form>

          </div>

        </div>

        {/* Order Summary */}

        <div className="col-lg-4">

          <div
            className="card shadow border-0 p-4"
            style={{
              position: "sticky",
              top: "90px",
            }}
          >

            <h3 className="fw-bold mb-4">
              Order Summary
            </h3>

            {cart.map((item) => (

              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

            <hr />

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

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
