
import React from 'react';
import { Download, Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ResourceCardProps {
  title: string;
  category: string;
  date: string;
  image: string;
  downloadLink: string;
  featured?: boolean;
  downloads?: number;
  description?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  category, 
  date, 
  image, 
  downloadLink,
  featured = false,
  downloads = 0,
  description = ""
}) => {
  const getCategoryClass = (category: string) => {
    switch(category) {
      case 'Data Analysis':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700';
      case 'AI & Data Science':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700';
      case 'Career Advice':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700';
      case 'SQL':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700';
      case 'Python':
        return 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700';
      case 'Interview Questions':
        return 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700';
      case 'Power BI':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700';
      case 'Machine Learning':
        return 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700';
    }
  };

  return (
    <div className="resource-card flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-edtech-teal text-white border-none">
            Featured
          </Badge>
        )}
        {downloads > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center bg-black/50 text-white text-xs rounded-full px-2 py-1 backdrop-blur-sm">
            <Download size={10} className="mr-1" />
            {downloads.toLocaleString()}
          </div>
        )}
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <Badge className={`mb-3 ${getCategoryClass(category)}`}>
          {category}
        </Badge>
        <h3 className="text-lg font-semibold text-edtech-blue-dark mb-2 line-clamp-2 group-hover:text-edtech-teal transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-edtech-blue-medium text-sm mb-4 line-clamp-2">{description}</p>
        )}
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            <span>{date}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="text-edtech-teal border-edtech-teal hover:bg-edtech-teal hover:text-white transition-colors"
            asChild
          >
            <a href={downloadLink}>
              <Download size={14} className="mr-1" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
