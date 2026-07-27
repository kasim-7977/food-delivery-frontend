import "./Home.css"; 

function Home() {
  return (
    // Style the wrapper div to cover the whole screen
    <div className="container mt-5 dd" style={{ backgroundColor: 'burlywood', minHeight: '100vh' }}>
    <h1>W<span>e</span>l<span>c</span>o<span>m</span>e T<span>o</span> M<span>y</span>   🐼   F<span>o</span>o<span>d</span> D<span>e</span>l<span>i</span>v<span>e</span>r<span>y</span> A<span>p</span>p</h1>
    <p class="lead text-start mt-4">Welcome to FoodExpress! Discover delicious meals from your favorite restaurants and get them delivered to your doorstep quickly and conveniently.</p>
    </div>  
  );
}

export default Home;
