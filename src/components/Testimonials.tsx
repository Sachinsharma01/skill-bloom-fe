
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The courses on this platform completely transformed my career path. I went from knowing basic HTML to landing a full-stack developer job in just 6 months.",
    name: "Alex Johnson",
    title: "Software Developer",
    avatar: "AJ",
    company: "Tech Innovate",
  },
  {
    id: 2,
    quote: "The instructors are incredibly knowledgeable and the course content is up-to-date with industry standards. Best investment I've made in my education.",
    name: "Sarah Williams",
    title: "UX Designer",
    avatar: "SW",
    company: "Creative Studios",
  },
  {
    id: 3,
    quote: "I've taken courses on multiple platforms, but the quality of teaching and support here is unmatched. The community of learners is also incredibly helpful.",
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
            What Our Students Say
          </h2>
          <p className="text-lg text-edtech-secondary max-w-2xl mx-auto">
            Discover how our courses have helped thousands of students achieve their goals and transform their careers.
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
