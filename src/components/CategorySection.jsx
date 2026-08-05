import { useEffect, useState } from "react";
import api from "../services/api";

function CategorySection() {

const [categories,setCategories]=useState([]);

useEffect(()=>{

api.get("categories/")
.then(res=>setCategories(res.data));

},[]);

return(

<div className="container py-5">

<h2 className="text-center mb-5">

Explore Categories

</h2>

<div className="row">

{

categories.map(category=>(

<div className="col-md-3 mb-4" key={category.id}>

<div className="card shadow-sm border-0 category-card">

<img
src={category.image}
className="card-img-top"
style={{height:"180px",objectFit:"cover"}}
/>

<div className="card-body">

<h5 className="text-center">

{category.name}

</h5>

</div>

</div>

</div>

))

}

</div>

</div>

)

}

export default CategorySection;