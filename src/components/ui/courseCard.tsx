
import { Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  image: string;
  duration: string;
  lectureCount: string;
  type?: string;
}

export const CourseCard = ({ title, image, duration, lectureCount, type }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-36 sm:h-48 object-cover" />
        {type && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium">
            {type}
          </span>
        )}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1 md:gap-2">
            <Clock size={14} className="md:size-16" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <BookOpen size={14} className="md:size-16" />
            <span>{lectureCount} Lectures</span>
          </div>
        </div>
      </div>
    </div>
  );
};
