import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import api from "../services/api";

function PopularFoods(){

const[foods,setFoods]=useState([]);

useEffect(()=>{

api.get("foods/")
.then(res=>setFoods(res.data));

},[]);

return(

<div className="container py-5">

<h2 className="text-center mb-5">

Popular Foods

</h2>

<div className="row">

{

foods.slice(0,6).map(food=>(

<FoodCard
key={food.id}
food={food}
/>

))

}

</div>

</div>

)

}

export default PopularFoods;