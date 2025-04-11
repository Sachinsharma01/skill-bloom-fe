
import { Card, CardContent } from "@/components/ui/card";
import { 
  CodeIcon, 
  BarChart3Icon, 
  BrainCircuitIcon, 
  PencilRulerIcon, 
  CameraIcon,
  LanguagesIcon
} from "lucide-react";

const categories = [
  {
    name: "Programming & Development",
    description: "Learn coding, web development, mobile app creation and more",
    icon: CodeIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Business & Marketing",
    description: "Master business strategies, marketing, and entrepreneurship",
    icon: BarChart3Icon,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Data Science & AI",
    description: "Explore data analysis, machine learning and artificial intelligence",
    icon: BrainCircuitIcon,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Design & Creativity",
    description: "Develop skills in graphic design, UX/UI, illustration and more",
    icon: PencilRulerIcon,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Photography & Video",
    description: "Learn photography, videography, and visual storytelling",
    icon: CameraIcon,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Languages & Communication",
    description: "Master new languages and effective communication skills",
    icon: LanguagesIcon,
    color: "bg-teal-100 text-teal-600",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-edtech-dark mb-4">
            Explore Top Categories
          </h2>
          <p className="text-lg text-edtech-secondary">
            Discover the perfect course category to help you achieve your learning goals and advance your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-none">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                  <category.icon size={24} />
                </div>
                <h3 className="font-bold text-xl text-edtech-dark mb-2">{category.name}</h3>
                <p className="text-edtech-secondary">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
