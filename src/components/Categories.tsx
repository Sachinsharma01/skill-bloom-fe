
import { Card, CardContent } from "../components/ui/card";
import { 
  RocketIcon,
  Briefcase,
  BrainCircuit,
  Palette,
  ClipboardCheck,
  Code2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Build Your Portfolio",
    description: "Create your portfolio in just 5 minutes — no coding needed",
    icon: RocketIcon,
    color: "bg-blue-100 text-blue-600",
    link: "/portfolio",
  },
  {
    name: "Career Launchpad",
    description: "Explore top companies, expert resume formats & interview prep",
    icon: Briefcase,
    color: "bg-yellow-100 text-yellow-600",
    link: "/resources",
  },
  {
    name: "Job-Ready Resources",
    description: "LinkedIn checklist, optimization tools, and more",
    icon: ClipboardCheck,
    color: "bg-purple-100 text-purple-600",
    link: "/resources",
  },
  // {
  //   name: "Data Career Hub",
  //   description: "Tailored for data analysts and data engineers",
  //   icon: BrainCircuit,
  //   color: "bg-green-100 text-green-600",
  // },
  // {
  //   name: "Full Stack Development",
  //   description: "Master front-end, back-end, and everything in between",
  //   icon: Code2,
  //   color: "bg-pink-100 text-pink-600",
  // },
  // {
  //   name: "Creator’s Toolkit",
  //   description: "Design, storytelling & communication essentials",
  //   icon: Palette,
  //   color: "bg-red-100 text-red-600",
  // },
];

const Categories = () => {
  const navigate = useNavigate()
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-edtech-dark mb-4">
            Explore Top Categories
          </h2>
          <p className="text-lg text-edtech-secondary">
            Discover the perfect resources category to help you achieve your learning goals and advance your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-none" onClick={() => navigate(category.link)}>
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
