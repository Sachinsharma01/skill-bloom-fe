
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

type CollegeData = {
  name: string;
  degree: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  courses: { name: string; grade?: string }[];
  imageUrl: string;
  websiteUrl?: string;
};

const colleges: CollegeData[] = [
  {
    name: "Massachusetts Institute of Technology",
    degree: "Bachelor of Science in Computer Science",
    location: "Cambridge, MA",
    period: "2015 - 2019",
    description: "Graduated with honors in the Computer Science and Engineering program. Focused on artificial intelligence and machine learning applications.",
    achievements: [
      "Dean's List for Academic Excellence (All Semesters)",
      "Won 1st place in the Annual Hackathon for AI Innovation",
      "Published research paper on 'Neural Networks in Modern Web Applications'"
    ],
    courses: [
      { name: "Advanced Algorithms", grade: "A" },
      { name: "Machine Learning", grade: "A+" },
      { name: "Computer Graphics", grade: "A-" },
      { name: "Computational Theory", grade: "A" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&h=600&fit=crop&q=80",
    websiteUrl: "https://mit.edu"
  },
  {
    name: "Stanford University",
    degree: "Master of Science in Software Engineering",
    location: "Stanford, CA",
    period: "2019 - 2021",
    description: "Specialized in software engineering practices with focus on scalable systems design and development methodologies.",
    achievements: [
      "Graduate Student Instructor for Web Development course",
      "Recipient of the Engineering Leadership Award",
      "Developed an open-source project with 5,000+ GitHub stars"
    ],
    courses: [
      { name: "Advanced Web Architecture", grade: "A" },
      { name: "Software Design Patterns", grade: "A+" },
      { name: "Cloud Computing", grade: "A" },
      { name: "Human-Computer Interaction", grade: "A-" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1569863959165-56c11c9b7560?w=800&h=600&fit=crop&q=80",
    websiteUrl: "https://stanford.edu"
  }
];

const College: React.FC = () => {
  return (
    <section id="education" className="section-spacing bg-theme-deep-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-theme-neon-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-theme-light-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block">Academic Journey</span>
          <h2 className="text-4xl font-bold mb-6">
            Education & <span className="text-gradient">College Life</span>
          </h2>
          <div className="w-16 h-1 bg-theme-neon-green mx-auto mb-10"></div>
          <p className="text-theme-text-muted text-lg">
            Where I gained the knowledge and skills that shaped my professional journey
          </p>
        </motion.div>

        <div className="space-y-24 max-w-5xl mx-auto">
          {colleges.map((college, index) => (
            <motion.div 
              key={college.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div className={`order-2 ${index % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-theme-neon-green/20 to-theme-light-blue/20 rounded-lg blur-lg opacity-70"></div>
                  <div className="relative overflow-hidden rounded-lg border border-theme-border-color">
                    <img 
                      src={college.imageUrl} 
                      alt={college.name} 
                      className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 !== 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-theme-text-light">{college.name}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-2 text-theme-neon-green">
                      <GraduationCap size={18} />
                      {college.degree}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-theme-text-muted mb-5">
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-theme-light-blue" />
                      {college.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-theme-light-blue" />
                      {college.period}
                    </span>
                  </div>
                  
                  <p className="text-theme-text-muted">{college.description}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-xl font-medium flex items-center gap-2 mb-3">
                      <Award size={20} className="text-theme-neon-green" />
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {college.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-theme-neon-green mt-1">▹</span>
                          <span className="text-theme-text-muted">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-xl font-medium flex items-center gap-2 mb-3">
                      <BookOpen size={20} className="text-theme-neon-green" />
                      Key Courses
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {college.courses.map((course, idx) => (
                        <div key={idx} className="flex justify-between p-2 border border-theme-border-color rounded-md bg-theme-dark-blue">
                          <span className="text-theme-text-light">{course.name}</span>
                          {course.grade && (
                            <span className="text-theme-neon-green font-medium">{course.grade}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {college.websiteUrl && (
                    <div className="mt-6">
                      <Button asChild variant="outline" className="neo-btn">
                        <a href={college.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <span>Visit Website</span>
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default College;
