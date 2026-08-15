import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error("Orders error:", error);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger"></div>
        <p className="mt-3 text-muted">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">
          My Orders
        </h1>

        <p className="text-muted">
          Track your delicious orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm text-center p-5">

          <div style={{ fontSize: "70px" }}>
            🍽️
          </div>

          <h3 className="fw-bold mt-3">
            No orders yet
          </h3>

          <p className="text-muted">
            Your orders will appear here after you place an order.
          </p>

          <a
            href="/menu"
            className="btn btn-danger px-4"
          >
            Browse Menu
          </a>

        </div>
      ) : (

        orders.map((order) => (

          <div
            className="card border-0 shadow-sm mb-4"
            key={order.id}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="fw-bold mb-1">
                    Order #{order.id}
                  </h5>

                  <small className="text-muted">
                    {new Date(
                      order.created_at
                    ).toLocaleString()}
                  </small>
                </div>

                <span
                  className={`badge rounded-pill px-3 py-2 ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Cancelled"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status}
                </span>

              </div>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <p className="mb-1 text-muted">
                    Customer
                  </p>

                  <h6 className="fw-bold">
                    {order.full_name}
                  </h6>

                </div>

                <div className="col-md-6">

                  <p className="mb-1 text-muted">
                    Mobile
                  </p>

                  <h6 className="fw-bold">
                    {order.mobile}
                  </h6>

                </div>

              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    Total Amount
                  </small>

                  <h4 className="fw-bold text-danger mb-0">
                    ₹{order.total_amount}
                  </h4>
                </div>

                <button
                  className="btn btn-outline-dark"
                  type="button"
                >
                  View Order
                </button>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default MyOrders;
