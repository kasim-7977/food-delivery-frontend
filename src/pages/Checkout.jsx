import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    full_name: "",
    // email:"",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    api.post(
      "https://food-delivery-api-cyuc.onrender.com/api/place-order/",
      {
        user: 2,
        full_name: form.full_name,
        // email:form.email,
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
      }
    );
    alert("Order Placed Successfully!");
  } catch (error) {
    console.log(error);
    alert("Failed to Place Order");
  }
};
  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        
       <input
          className="form-control mb-2"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />

        <h4>Total: ₹{total}</h4>

        <button
          className="btn btn-success"
          type="submit"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
