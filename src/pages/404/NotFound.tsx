import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-9xl font-bold text-edtech-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-edtech-dark mb-4">Page Not Found</h2>
          <p className="text-edtech-secondary mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
          </p>
          <Button asChild size="lg" className="bg-edtech-primary hover:bg-edtech-primary/90">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
