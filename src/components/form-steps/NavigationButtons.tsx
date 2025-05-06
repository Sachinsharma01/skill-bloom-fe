
import React from 'react';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface NavigationButtonsProps {
  onNext?: () => Promise<boolean> | boolean;
  nextLabel?: string;
  showGenerateButton?: boolean;
  isLastStep?: boolean;
}

export function NavigationButtons({ 
  onNext, 
  nextLabel = "Next", 
  showGenerateButton = false,
  isLastStep = false
}: NavigationButtonsProps) {
  const { goToPrevStep, goToNextStep, currentStep } = usePortfolio();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    if (onNext) {
      setIsLoading(true);
      try {
        const canProceed = await onNext();
        if (canProceed) {
          goToNextStep();
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="flex justify-between pt-6 border-t mt-8">
      <Button
        variant="outline"
        onClick={goToPrevStep}
        className="flex items-center gap-2"
        disabled={currentStep === 'basicInfo' || isLoading}
      >
        <ArrowLeft className="h-4 w-4" /> Prev
      </Button>

      <Button
        onClick={handleNext}
        className="flex items-center gap-2"
        disabled={isLoading || (showGenerateButton && !isLastStep)}
      >
        {isLoading ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          <>
            {nextLabel} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      {showGenerateButton && (
        <Button 
          onClick={handleNext}
          variant="default"
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          disabled={isLoading}
        >
          Generate Portfolio
        </Button>
      )}
    </div>
  );
}
