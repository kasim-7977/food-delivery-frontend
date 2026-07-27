import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/dashboard/")
      .then((response) => {
        setData(response.data);
      });

  }, []);

  return (
    <div className="container mt-4">

      <h2>Admin Dashboard</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Users</h5>
            <h3>{data.total_users}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Foods</h5>
            <h3>{data.total_foods}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Orders</h5>
            <h3>{data.total_orders}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Revenue</h5>
            <h3>₹{data.total_revenue}</h3>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;