import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-edtech-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <img src={logo} alt="Skill Bloom Logo" className="w-20 h-20" />
            </h3>
            <p className="text-gray-400 mb-6">
              Empowering individuals to master new skills and advance their careers through quality online education.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <YoutubeIcon size={20} />
              </a> */}
              <a href="https://www.linkedin.com/company/skill-bloom" target="_blank" className="text-gray-400 hover:text-white">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white">
                  Explore Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li> */}
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Course Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses/programming" className="text-gray-400 hover:text-white">
                  Build Your Portfolio
                </Link>
              </li>
              <li>
                <Link to="/courses/business" className="text-gray-400 hover:text-white">
                  Career Launchpad
                </Link>
              </li>
              <li>
                <Link to="/courses/data-science" className="text-gray-400 hover:text-white">
                  Job-Ready Resources
                </Link>
              </li>
              <li>
                <Link to="/courses/design" className="text-gray-400 hover:text-white">
                  Data Career Hub
                </Link>
              </li>
              <li>
                <Link to="/courses/personal" className="text-gray-400 hover:text-white">
                  Full Stack Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates on new courses and special offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-edtech-primary hover:bg-edtech-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Skill Bloom. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
