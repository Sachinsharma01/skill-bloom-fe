
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "I created a professional portfolio in just 10 minutes using SkillBoom. It saved me hours of design work and gave me the confidence to start applying for real jobs.",
    name: "Alex Johnson",
    title: "Software Developer",
    avatar: "AJ",
    company: "Tech Innovate",
  },
  {
    id: 2,
    quote: "TThe premium resources are a goldmine. I used the resume template and LinkedIn checklist, and recruiters actually started noticing me!",
    name: "Sarah Williams",
    title: "UX Designer",
    avatar: "SW",
    company: "Creative Studios",
  },
  {
    id: 3,
    quote: "I’ve tried a bunch of tools before, but SkillBoom just gets it right. It's everything a beginner needs to stand out—without feeling overwhelmed.",
    name: "Michael Chen",
    title: "Data Analyst",
    avatar: "MC",
    company: "Data Insights Inc.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-edtech-primary/5 to-edtech-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-edtech-dark mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-edtech-secondary max-w-2xl mx-auto">
          See how SkillBoom is helping individuals build standout portfolios, access premium tools, and move ahead in their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg">
              <CardContent className="p-6">
                <Quote className="text-edtech-primary mb-4 opacity-30" size={32} />
                <p className="text-edtech-secondary mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-edtech-dark">{testimonial.name}</h4>
                    <p className="text-sm text-edtech-secondary">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
