import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/orders/")
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="card p-3 mb-3" key={order.id}>
          <h5>Order #{order.id}</h5>

          <p>Name: {order.full_name}</p>

          <p>Total: ₹{order.total_amount}</p>
          <p>Status: {order.status}</p>
          <p>
            Date:{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;