import { useState } from "react";
import axios from "axios";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
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
      await api.post(
        "https://food-delivery-api-cyuc.onrender.com/api/register/",
        form
      );

      alert("Registration Successful!");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
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
          className="btn btn-primary"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
