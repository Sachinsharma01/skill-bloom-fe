import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

type EducationData = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  keySkills: string[];
  _id: string;
};

const College: React.FC<{ education: EducationData[] }> = ({ education }) => {
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
          {education.map((edu, index) => (
            <motion.div 
              key={edu.id}
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
                      src={`https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                      alt={edu.institution} 
                      className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 !== 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-theme-text-light">{edu.institution}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-2 text-theme-neon-green">
                      <GraduationCap size={18} />
                      {edu.degree} in {edu.field}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-theme-text-muted mb-5">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-theme-light-blue" />
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  
                  {edu.achievements.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xl font-medium flex items-center gap-2 mb-3">
                        <Award size={20} className="text-theme-neon-green" />
                        Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-theme-neon-green mt-1">▹</span>
                            <span className="text-theme-text-muted">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {edu.keySkills.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xl font-medium flex items-center gap-2 mb-3">
                        <BookOpen size={20} className="text-theme-neon-green" />
                        Key Skills
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {edu.keySkills.map((skill, idx) => (
                          <div key={idx} className="flex justify-between p-2 border border-theme-border-color rounded-md bg-theme-dark-blue">
                            <span className="text-theme-text-light">{skill}</span>
                          </div>
                        ))}
                      </div>
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
