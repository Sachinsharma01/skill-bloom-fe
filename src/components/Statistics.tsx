
import { GraduationCapIcon, UsersIcon, AwardIcon, BookOpenIcon } from "lucide-react";

const stats = [
  {
    value: "20+",
    label: "Top Resources",
    icon: BookOpenIcon,
    description: "Resources created by industry experts"
  },
  {
    value: "100+",
    label: "Active Students",
    icon: UsersIcon,
    description: "Learning and growing with us"
  },
  {
    value: "10+",
    label: "Subject Areas",
    icon: GraduationCapIcon,
    description: "From programming to business"
  },
  {
    value: "99%",
    label: "Success Rate",
    icon: AwardIcon,
    description: "Of our dedicated students"
  },
];

const Statistics = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-edtech-primary/10 text-edtech-primary mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-edtech-dark mb-2">{stat.value}</div>
              <div className="text-lg font-medium text-edtech-primary mb-1">{stat.label}</div>
              <div className="text-sm text-edtech-secondary">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
