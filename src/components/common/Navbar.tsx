import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { token, isLoggedIn } = useSelector((state: any) => state.tokenReducer);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Skill Bloom Logo" className="w-20 h-20" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-edtech-secondary hover:text-edtech-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="text-edtech-secondary hover:text-edtech-primary font-medium"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="text-edtech-secondary hover:text-edtech-primary font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-edtech-secondary hover:text-edtech-primary font-medium"
            >
              Contact
            </Link>
            {/* <Link to="/blog" className="text-edtech-secondary hover:text-edtech-primary font-medium">
              Blog
            </Link> */}
          </nav>

          {/* CTA Buttons */}
          {isLoggedIn ? (
            <Avatar image={undefined} name="Sachin" />
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="text-edtech-primary border-edtech-primary hover:bg-edtech-primary hover:text-white"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-edtech-primary hover:bg-edtech-primary/90 text-white"
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-edtech-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-edtech-secondary hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 rounded-md text-base font-medium text-edtech-secondary hover:bg-gray-100"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-edtech-secondary hover:bg-gray-100"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-edtech-secondary hover:bg-gray-100"
            >
              Contact
            </Link>
            {/* <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-edtech-secondary hover:bg-gray-100"
            >
              Blog
            </Link> */}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="w-full mb-2 text-edtech-primary border-edtech-primary hover:bg-edtech-primary hover:text-white"
                >
                  Log In
                </Button>
                <Button className="w-full bg-edtech-primary hover:bg-edtech-primary/90 text-white">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
