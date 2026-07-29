import axios from "axios";

const api = axios.create({
    baseURL: "https://food-delivery-api-cyuc.onrender.com/api/",
});

export default api;
