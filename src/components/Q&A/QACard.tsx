
import React, { useState, useEffect } from "react";
import { Check, X, Lightbulb, ThumbsUp, ThumbsDown, CheckCircle, Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface QACardProps {
  question: string;
  answer: string;
  hint?: string;
  index: number;
  totalQuestions: number;
  completed?: boolean;
  onComplete?: () => void;
}

const QACard: React.FC<QACardProps> = ({ 
  question, 
  answer, 
  hint, 
  index, 
  totalQuestions,
  completed = false,
  onComplete 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(null);
  const [viewTimer, setViewTimer] = useState<NodeJS.Timeout | null>(null);

  // Mark as completed when expanded for a while - reduced to 1 second
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (expanded && !completed && onComplete) {
      // Clear any existing timer
      if (viewTimer) clearTimeout(viewTimer);
      
      // Set a new timer for 1 second
      timer = setTimeout(() => {
        onComplete();
      }, 1000); // Mark as completed after 1 second of viewing
      
      setViewTimer(timer);
    }
    
    return () => {
      if (viewTimer) clearTimeout(viewTimer);
    };
  }, [expanded, completed, onComplete, viewTimer]);

  const toggleExpansion = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // Keep hint visible if it was already shown
      // Do nothing with the hint state
    } else {
      // Hide hint when closing the answer
      setShowHint(false);
    }
  };

  const toggleHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHint(!showHint);
  };

  const handleFeedback = (type: 'helpful' | 'unhelpful') => {
    setFeedback(type);
    // Here you could also send this feedback to your backend
    console.log(`User found answer to question ${index + 1} ${type}`);
  };

  return (
    <div 
      className={cn(
        "qa-card bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-6 transition-all duration-300",
        expanded ? "qa-card-expanded shadow-xl border-l-4 border-l-teal-500" : "hover:shadow-lg",
        completed ? "border-l-4 border-l-green-500" : ""
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={cn(
          "qa-question flex justify-between items-center py-3 text-deepBlue cursor-pointer group",
          expanded ? "text-teal border-teal" : "border-gray-200"
        )}
      >
        <div className="flex items-center">
          <div 
            className={cn(
              "question-number flex-shrink-0 mr-3 w-8 h-8 rounded-full flex items-center justify-center",
              completed ? "bg-green-100 text-green-600 border-green-500" : "border border-gray-300 text-gray-600"
            )}
          >
            {completed ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <h3 className="font-serif font-medium text-lg md:text-xl">
            <span className="text-sm font-sans font-medium text-gray-500 mr-2">#{index + 1}</span>
            {question}
          </h3>
        </div>
        <div className="flex items-center">
          {hint && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "mr-2 bg-amber-50 hover:bg-amber-100 transition-all",
                showHint ? "text-amber-700" : "text-amber-500"
              )}
              onClick={toggleHint}
            >
              <Lightbulb className={cn("h-5 w-5", showHint ? "text-amber-700" : "text-amber-500")} />
              <span className="ml-1 text-xs font-medium">Hint</span>
            </Button>
          )}
          <Button
            variant={expanded ? "outline" : "default"}
            size="sm"
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              expanded 
                ? "bg-red-50 border-red-400 text-red-500 hover:bg-red-100" 
                : "bg-edtech-common-light border-edtech-common text-edtech-common hover:bg-edtech-common hover:text-white",
              "min-w-24"
            )}
            onClick={toggleExpansion}
            aria-label={expanded ? "Hide answer" : "View answer"}
          >
            {expanded ? (
              <>
                <X className="w-4 h-4 mr-1" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-1" />
                <span>View Answer</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {hint && showHint && (
        <div className="bg-amber-50 p-3 my-2 rounded-md border border-amber-200 text-amber-800 text-sm animate-fade-in">
          <div className="flex items-start">
            <Lightbulb className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
            <p>{hint}</p>
          </div>
        </div>
      )}
      
      {expanded && (
        <>
          <div className="qa-answer text-deepBlue-light pt-4 opacity-100 animate-fade-in">
            <div className="p-4 bg-teal-50 rounded-md border border-teal-100">
              <p className="text-gray-700 leading-relaxed">{answer}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-end">
            <p className="text-sm text-gray-500 mr-3">Was this helpful?</p>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  feedback === 'helpful' ? "bg-teal-100 text-teal" : "text-gray-400 hover:text-teal hover:bg-teal-50"
                )}
                onClick={() => handleFeedback('helpful')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  feedback === 'unhelpful' ? "bg-red-100 text-red-500" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                )}
                onClick={() => handleFeedback('unhelpful')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QACard;
