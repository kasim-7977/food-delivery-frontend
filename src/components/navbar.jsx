import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce(
  (total, item) => total + (item.quantity || 1),
  0
);
const token = localStorage.getItem("token");
console.log("Cart:", cart);
console.log("Cart Count:", cartCount);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          PANDA 🐼 
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/portfolio">
            Portfolio
          </Link>

          <Link className="nav-link" to="/menu">
            Menu
          </Link>

          <Link className="nav-link" to="/cart">
          Cart ({cartCount})
          </Link>

          <Link className="nav-link" to="/profile">
          Profile
          </Link>

          <Link className="nav-link" to="/orders">
          My Orders
          </Link>
          
          <Link className="nav-link" to="/dashboard">
          Dashboard
          </Link>
          {
  token ? (
    <button
      className="btn btn-danger ms-2"
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      Logout
    </button>
  ) : (
    <>
      <Link className="nav-link" to="/login">
        Login
      </Link>

      <Link className="nav-link" to="/register">
        Register
      </Link>
    </>
  )
}
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;