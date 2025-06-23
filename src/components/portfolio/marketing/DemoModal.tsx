import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-6xl h-[85vh] sm:h-[80vh] p-0">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="flex items-center justify-between text-base sm:text-lg">
            <span>Portfolio Demo Preview</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-4 sm:p-6 pt-0">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-full flex items-center justify-center relative overflow-hidden">
            {/* Mock portfolio preview */}
            <div className="text-center p-4 sm:p-8 max-w-sm sm:max-w-md mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 sm:mb-6"></div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">John Doe</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Full Stack Developer</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <div className="text-xs sm:text-sm font-medium">Projects</div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">12+</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <div className="text-xs sm:text-sm font-medium">Experience</div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">3 Years</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-4/5"></div>
                  </div>
                  <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-3/5"></div>
                  </div>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Open Full Demo
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 bg-purple-300/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-10 h-10 sm:w-20 sm:h-20 bg-blue-300/30 rounded-xl rotate-45 animate-bounce"></div>
            <div className="absolute top-1/2 right-10 sm:right-20 w-6 h-6 sm:w-12 sm:h-12 bg-green-300/30 rounded-full animate-ping"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
