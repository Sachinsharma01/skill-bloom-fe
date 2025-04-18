import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-r from-edtech-dark to-edtech-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Stand Out With a Live Portfolio & Curated Career Resources
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
            Get online in 5 minutes with an effortless portfolio builder.
            Explore top resources to boost your job search and professional brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-edtech-primary hover:bg-edtech-primary/90 text-white font-medium px-6"
                onClick={() => navigate('/resources')}
              >
                Explore Resources
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 transform rotate-2 animate-fade-in">
              <div className="aspect-video rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Students learning online"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-edtech-dark font-bold">
                    Web Development Masterclass
                  </div>
                  <div className="text-edtech-primary font-bold">$89</div>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-500">
                    4.9 (2,532 reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="hidden md:block absolute -bottom-4 -left-4 w-20 h-20 bg-edtech-primary rounded-full opacity-20"></div>
            <div className="hidden md:block absolute -top-4 -right-4 w-12 h-12 bg-edtech-accent rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
