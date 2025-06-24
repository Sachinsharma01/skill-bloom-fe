import { Button } from "../../../components/ui/button";
import { Play, Eye, Code, Smartphone } from "lucide-react";
import { toast } from "../../../hooks/use-toast";

interface PreviewSectionProps {
  onPreview: () => void;
}

const PreviewSection = ({ onPreview }: PreviewSectionProps) => {
  return (
    <section className="py-12 sm:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">
            See It in Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            Don't take our word for it. Experience the portfolio yourself and see why it's the perfect choice for your career.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main preview mockup */}
          <div className="relative mb-8 sm:mb-12 mx-4 sm:mx-0">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl p-1">
              <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 aspect-video flex items-center justify-center relative overflow-hidden">
                  {/* Mock browser window */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  {/* Mock content */}
                  <div className="text-center px-4">
                    <Play className="w-12 h-12 sm:w-20 sm:h-20 text-white/80 mb-3 sm:mb-4 mx-auto" />
                    <h3 className="text-lg sm:text-2xl font-bold mb-2">Interactive Demo</h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Click to see the full portfolio in action</p>
                    <Button 
                      onClick={() => toast({
                        title: 'Trust us, it is coming soon!',
                        description: 'We are working on it and it will be available soon.',
                        variant: 'info',
                      })}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Launch Demo
                    </Button>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-8 h-8 sm:w-16 sm:h-16 bg-purple-500/20 rounded-xl rotate-12 animate-pulse"></div>
                  <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-6 h-6 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
