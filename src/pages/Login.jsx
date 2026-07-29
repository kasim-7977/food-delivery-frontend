import { useState } from "react";
import api from "../services/api";


function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "https://food-delivery-api-cyuc.onrender.com/api/login/",
        form
      );

      localStorage.setItem(
        "token",
        res.data.access
      );

      alert("Login Successful!");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="btn btn-success"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
