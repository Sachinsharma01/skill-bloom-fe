
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Circle, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import QACard from "./QACard";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  completed?: boolean;
}

interface QACarouselProps {
  items: QAItem[];
  title: string;
}

const QACarousel: React.FC<QACarouselProps> = ({ items, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [qaItems, setQaItems] = useState<QAItem[]>(items.map(item => ({ ...item, completed: false })));
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate progress percentage based on completed items
  const completedCount = qaItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / qaItems.length) * 100;

  const goToNext = () => {
    setActiveIndex((prev) => (prev === qaItems.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? qaItems.length - 1 : prev - 1));
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  const markAsCompleted = (index: number) => {
    const updatedItems = [...qaItems];
    updatedItems[index] = { ...updatedItems[index], completed: true };
    setQaItems(updatedItems);
  };

  // Generate a dynamic interactive progress indicator based on items length
  const renderProgressIndicators = () => {
    const totalQuestions = qaItems.length;
    
    // For many questions, use a segment-based approach instead of individual dots
    if (totalQuestions > 10) {
      const segmentCount = Math.min(10, totalQuestions); // Max 10 segments
      const segments = [];
      
      for (let i = 0; i < segmentCount; i++) {
        // Calculate which questions this segment represents
        const startIndex = Math.floor(i * totalQuestions / segmentCount);
        const endIndex = Math.floor((i + 1) * totalQuestions / segmentCount) - 1;
        
        // Calculate if this segment is the active one
        const isActiveSegment = activeIndex >= startIndex && activeIndex <= endIndex;
        
        // Calculate how many questions in this segment are completed
        const questionsInSegment = qaItems.slice(startIndex, endIndex + 1);
        const completedInSegment = questionsInSegment.filter(q => q.completed).length;
        const completionRatio = questionsInSegment.length > 0 ? completedInSegment / questionsInSegment.length : 0;
        
        segments.push(
          <div
            key={`segment-${i}`}
            className={cn(
              "progress-pill h-2 flex-1 mx-0.5 cursor-pointer",
              isActiveSegment 
                ? "progress-pill-active bg-teal pulse-indicator" 
                : completionRatio > 0.5 
                  ? "bg-green-500"
                  : completionRatio > 0 
                    ? "bg-teal/30"
                    : "bg-gray-300"
            )}
            onClick={() => goToIndex(startIndex)}
            title={`Questions ${startIndex + 1}-${endIndex + 1}`}
          />
        );
      }
      
      return (
        <div className="flex w-full mt-4">
          {segments}
        </div>
      );
    }
    
    // For fewer questions, use the dot-based approach
    return qaItems.map((item, idx) => (
      <button
        key={`nav-${idx}`}
        onClick={() => goToIndex(idx)}
        className={cn(
          "progress-dot relative w-7 h-7 mx-0.5 rounded-full flex items-center justify-center border transition-all",
          activeIndex === idx 
            ? "bg-teal border-teal text-white transform scale-110 pulse-indicator" 
            : item.completed 
              ? "bg-green-100 border-green-500 text-green-500" 
              : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-500"
        )}
        aria-label={`Go to question ${idx + 1}`}
      >
        {item.completed ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <Circle className={cn("h-4 w-4", activeIndex === idx ? "text-white" : "text-gray-400")} />
        )}
      </button>
    ));
  };

  return (
    <div className="qa-carousel-container w-full max-w-4xl mx-auto px-4 py-8">
      {/* Redesigned header with back button and improved counter */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          {/* Logo and Back button */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-deepBlue flex items-center justify-center text-white font-bold text-xl">
              Q&A
            </div>
            <Button variant="ghost" size="sm" className="ml-2 flex items-center gap-1 hover:bg-gray-100">
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
          </div>
        </div>
        
        {/* Enhanced progress bar */}
        <div className="flex-1 mx-6 max-w-md">
          <div className="flex flex-col">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span className="font-medium">Progress</span>
              <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-100 rounded-full overflow-hidden" 
            />
          </div>
        </div>

        {/* Interactive visual counter with animation */}
        <div className="flex items-center gap-3">
          <div className="bg-teal/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, qaItems.length) }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    idx === activeIndex % 5 
                      ? "bg-teal scale-125 pulse-indicator" 
                      : idx < (activeIndex % 5)
                        ? "bg-teal/60"
                        : "bg-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-deepBlue whitespace-nowrap">
              {activeIndex + 1}/{qaItems.length}
            </span>
          </div>
          
          {/* Profile avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-deepBlue to-teal flex items-center justify-center text-white cursor-pointer hover:shadow-md transition-all">
            <span className="text-sm font-semibold">ME</span>
          </div>
        </div>
      </div>
      
      {/* Add space to account for the fixed header */}
      <div className="h-16 mb-8"></div>

      <h2 className="text-3xl md:text-4xl font-serif font-bold text-deepBlue mb-8 text-center">
        {title}
      </h2>
      
      <div className="relative">
        {/* Mobile indicators with improved design */}
        <div className="md:hidden flex justify-center items-center space-x-2 mb-4">
          {/* Visual progress bar for mobile */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal via-teal-light to-green-500 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect"></div>
            </div>
          </div>
        </div>

        {/* Navigation buttons - Desktop */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white hover:bg-teal hover:text-white transition-colors"
            onClick={goToPrev}
            aria-label="Previous question"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white hover:bg-teal hover:text-white transition-colors"
            onClick={goToNext}
            aria-label="Next question"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Carousel content */}
        <div 
          ref={carouselRef}
          className="overflow-hidden bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <div className="flex">
              {qaItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="w-full flex-shrink-0"
                  style={{ transform: `translateX(${index * 100}%)` }}
                >
                  <QACard 
                    question={item.question}
                    answer={item.answer}
                    hint={item.hint}
                    index={index}
                    totalQuestions={qaItems.length}
                    completed={item.completed}
                    onComplete={() => markAsCompleted(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicators - adaptive based on number of questions */}
        <div className="hidden md:flex justify-center items-center mt-8 overflow-x-auto py-2">
          {renderProgressIndicators()}
        </div>

        {/* Mobile navigation buttons */}
        <div className="md:hidden flex justify-between mt-6">
          <Button
            variant="outline"
            className="text-deepBlue hover:text-teal hover:bg-gray-50"
            onClick={goToPrev}
            aria-label="Previous question"
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </Button>
          
          <Button
            variant="outline"
            className="text-deepBlue hover:text-teal hover:bg-gray-50"
            onClick={goToNext}
            aria-label="Next question"
          >
            Next <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QACarousel;
