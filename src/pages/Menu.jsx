import { useEffect, useState } from "react";
import api from "../services/api";
import FoodCard from "../components/FoodCard";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    api.get("categories/")
  .then((response) => {
    setCategories(response.data);
  })
    api.get("foods/")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <div className="container mt-4">
        <h1>Our Menu</h1>
        <input
  type="text"
  className="form-control mb-3"
  placeholder="Search food..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}/>
  <div className="mb-4">

  <button
    className="btn btn-dark me-2"
    onClick={() => setSelectedCategory(0)}
  >
    All
  </button>

  {categories.map((category) => (
    <button
      key={category.id}
      className="btn btn-outline-dark me-2"
      onClick={() => setSelectedCategory(category.id)}
    >
      {category.name}
    </button>
  ))}

</div>


      <div className="row">
        {
    filteredFoods.map((food) => (
        <FoodCard
            key={food.id}
            food={food}
        />
    ))
}
      </div>
    </div>
  );
}

export default Menu;