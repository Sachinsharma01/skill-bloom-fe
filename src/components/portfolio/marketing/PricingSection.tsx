import { Button } from "../../../components/ui/button";
import { Check, Star, Zap } from "lucide-react";

interface PricingSectionProps {
  onBuy: () => void;
}

const PricingSection = ({ onBuy }: PricingSectionProps) => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-4 sm:px-0">
            Invest in Your Future
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            For less than a dinner out, get a portfolio that could land you your dream job or next big client.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl p-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative">
              {/* Popular badge */}
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  MOST POPULAR
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
                    Premium Portfolio Template
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
                    Everything you need to create a stunning portfolio that gets you hired.
                  </p>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {[
                      "Complete React portfolio template",
                      "Mobile-responsive design",
                      "Easy customization guide",
                      "SEO optimized structure",
                      "Contact form integration",
                      "Social media links",
                      "Project showcase sections",
                      "Professional typography",
                      "Lifetime updates",
                      "24/7 support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
                    <div className="text-gray-500 text-base sm:text-lg line-through mb-1 sm:mb-2">₹1999</div>
                    <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">₹199</div>
                    <div className="text-gray-600 text-sm sm:text-base">One-time payment</div>
                    <div className="text-xs sm:text-sm text-green-600 mt-2 font-medium">Save ₹1800 - Limited time!</div>
                  </div>

                  <Button 
                    onClick={onBuy}
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg py-3 sm:py-4 rounded-xl group transition-all duration-300 hover:scale-105"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
                    Get Instant Access
                  </Button>

                  <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div>500+ Downloads</div>
              <div>100% Secure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
