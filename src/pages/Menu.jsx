import { useEffect, useState } from "react";
import api from "../services/api";
import FoodCard from "../components/FoodCard";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

    api.get("foods/")
      .then((res) => setFoods(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 0 ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Delicious Food</h1>
          <p className="lead">
            Fresh • Tasty • Fast Delivery
          </p>
        </div>
      </div>

      <div className="container py-5">

        {/* Search */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm rounded-pill"
              placeholder="🔍 Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="text-center mb-5">
          <button
            className={`btn rounded-pill me-2 mb-2 ${
              selectedCategory === 0
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => setSelectedCategory(0)}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn rounded-pill me-2 mb-2 ${
                selectedCategory === category.id
                  ? "btn-warning text-dark"
                  : "btn-outline-warning"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Food List */}

        <div className="row g-4">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))
          ) : (
            <div className="text-center py-5">
              <h4>No Food Found 🍔</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
