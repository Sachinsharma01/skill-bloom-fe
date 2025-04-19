import {
  GraduationCapIcon,
  UsersIcon,
  AwardIcon,
  BookOpenIcon,
  GlobeIcon,
  MapPinIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import publicApi from "../utils/publicApi";

const stats = [
  {
    value: "total_resources",
    label: "Top Resources",
    icon: BookOpenIcon,
    description: "Resources created by industry experts",
  },
  {
    value: "active_users",
    label: "Active Students",
    icon: UsersIcon,
    description: "Learning and growing with us",
  },
  {
    value: "total_categories",
    label: "Subject Areas",
    icon: GraduationCapIcon,
    description: "From programming to business",
  },
  {
    value: "success_rate",
    label: "Success Rate",
    icon: AwardIcon,
    description: "Our Success Rate",
  },
];

const Statistics = () => {
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response: any = await publicApi.getStats();
        const data = await response.json();
        console.log("response", data);
        setStatsData({success_rate: "99%", ...data.data});
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set default values if API call fails
        setStatsData({
          active_users: 0,
          total_resources: 0,
          total_categories: 0,
          total_states: 0,
          total_countries: 0,
          success_rate: "99%",
        });
      }
    };

    fetchStats();
  }, []);

  if (!statsData) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-edtech-primary/10 text-edtech-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-edtech-dark mb-2">
                  -
                </div>
                <div className="text-lg font-medium text-edtech-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-edtech-secondary">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-edtech-primary/10 text-edtech-primary mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-edtech-dark mb-2">
                {statsData[stat.value] || 0}
              </div>
              <div className="text-lg font-medium text-edtech-primary mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-edtech-secondary">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
