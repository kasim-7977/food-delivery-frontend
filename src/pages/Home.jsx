import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import PopularFoods from "../components/PopularFoods";
import Features from "../components/Features";
import DownloadApp from "../components/DownloadApp";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <PopularFoods />
      <Features />
      <DownloadApp />
      <Footer />
    </>
  );
}

export default Home;