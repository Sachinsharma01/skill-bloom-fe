import { Button } from "../../../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onPreview: () => void;
  onBuy: () => void;
}

const HeroSection = ({ onPreview, onBuy }: HeroSectionProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center text-white">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium">✨ Premium Portfolio Template</span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight px-4 sm:px-0">
          Stand Out in the
          <br />
          <span className="text-yellow-400">Digital Age</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
          Get hired faster with a portfolio that screams professionalism. 
          Built for creators, developers, and innovators who refuse to blend in.
        </p>
        
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
          <Button 
            onClick={onBuy}
            size="lg" 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full group transition-all duration-300 hover:scale-105"
          >
            Get Your Portfolio Now
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={onPreview}
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur"
          >
            See Live Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">5 Min</div>
            <div className="text-gray-300 text-sm sm:text-base">Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">100%</div>
            <div className="text-gray-300 text-sm sm:text-base">Customizable</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">∞</div>
            <div className="text-gray-300 text-sm sm:text-base">Career Opportunities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
