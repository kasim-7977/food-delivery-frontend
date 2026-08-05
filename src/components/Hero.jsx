import { Link } from "react-router-dom";
import "./Hero.css";
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">

            <h1 className="display-3 fw-bold">
              Delicious Food
              <br />
              Delivered Fast
            </h1>

            <p className="lead mt-4">
              Order your favourite meals from the best restaurants near you.
            </p>

            <Link
              to="/menu"
              className="btn btn-warning btn-lg mt-3"
            >
              Order Now
            </Link>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
              className="img-fluid hero-img"
              alt=""
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;