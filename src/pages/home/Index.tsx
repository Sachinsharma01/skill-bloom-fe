
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Categories from "@/components/Categories";
import FeaturedCourses from "@/components/FeaturedCourses";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from '../../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Statistics />
        <Categories />
        <FeaturedCourses />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
