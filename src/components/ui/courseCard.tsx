
import { Clock, BookOpen } from "lucide-react";
import { secondsToHoursOrMinutes } from "../../utils";
interface CourseCardProps {
  title: string;
  image_url: string;
  duration: number;
  total_lessons: string;
  category: string;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ title, image_url, duration, total_lessons, category, onClick }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative">
        <img src={image_url} alt={title} className="w-full h-36 sm:h-48 object-cover" />
        {category && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium">
            {category}
          </span>
        )}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1 md:gap-2">
            <Clock size={10} className="size-5" />
            <span>{secondsToHoursOrMinutes(duration)}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <BookOpen size={10} className="size-5" />
            <span>{total_lessons} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};
