
import React from 'react';
import { User, Award, Target, BookOpen, Globe, Lightbulb } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../../components/ui/navigation-menu';
import { Link } from 'react-router-dom';

// Team member type
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

// Values type
type CoreValue = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const About = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former education director with 15+ years of experience revolutionizing online learning experiences.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "Chief Learning Officer",
      bio: "Ph.D. in Educational Psychology, dedicated to creating engaging, effective learning experiences.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Amara Patel",
      role: "Head of Curriculum",
      bio: "Curriculum designer with expertise in adaptive learning technologies and personalized education.",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Rodriguez",
      role: "Technical Director",
      bio: "Software engineer passionate about creating intuitive, accessible educational platforms.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
  ];

  // Core values
  const coreValues: CoreValue[] = [
    {
      title: "Accessible Education",
      description: "We believe quality education should be available to everyone, regardless of location or background.",
      icon: <Globe className="h-10 w-10 text-brand-teal" />
    },
    {
      title: "Innovation",
      description: "We constantly explore new technologies and teaching methods to enhance the learning experience.",
      icon: <Lightbulb className="h-10 w-10 text-brand-teal" />
    },
    {
      title: "Excellence",
      description: "We're committed to delivering the highest quality educational content and experiences.",
      icon: <Award className="h-10 w-10 text-brand-teal" />
    },
    {
      title: "Student-Centered",
      description: "Everything we do focuses on empowering students to achieve their unique learning goals.",
      icon: <Target className="h-10 w-10 text-brand-teal" />
    }
  ];

  // Company milestones
  const milestones = [
    { year: 2018, event: "EduPlatform founded with a mission to democratize education" },
    { year: 2019, event: "Launched our first 10 courses, reaching 5,000 students" },
    { year: 2020, event: "Expanded to 50+ courses and introduced our adaptive learning technology" },
    { year: 2021, event: "Reached 100,000 students across 30 countries" },
    { year: 2022, event: "Established partnerships with 25 leading universities and organizations" },
    { year: 2023, event: "Introduced personalized learning paths and AI-driven content recommendations" }
  ];

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-blue-dark to-brand-blue-light text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{color: '#000'}}>
                Transforming Education for a Digital World
              </h1>
              <p className="text-xl opacity-90 mb-8">
                We're on a mission to make quality education accessible to everyone through innovative, engaging online learning experiences.
              </p>
              <div className="flex space-x-4">
                <Button asChild className="bg-brand-teal hover:bg-opacity-90 text-white">
                  <Link to="/courses">Explore Our Courses</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="mb-4">
                    Founded in 2018, EduPlatform began with a simple yet powerful idea: what if quality education were truly accessible to everyone?
                  </p>
                  <p className="mb-4">
                    Our founder, Sarah Johnson, experienced firsthand the transformative power of education but also saw how traditional educational systems often created barriers rather than opportunities.
                  </p>
                  <p className="mb-4">
                    With a team of passionate educators and technologists, we set out to build an educational platform that combines academic rigor with engaging, flexible learning experiences tailored to modern learners.
                  </p>
                  <p>
                    Today, we serve over 250,000 students worldwide, offering courses across diverse disciplines from coding to creative writing, business to biology, all designed with our core belief: learning should be accessible, engaging, and empowering.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-xl shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-teal/10 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-48 h-48 bg-brand-blue-light/10 rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-brand-teal"></div>
                <CardContent className="pt-8">
                  <BookOpen className="h-12 w-12 text-brand-teal mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To democratize education by providing accessible, high-quality learning experiences that empower individuals to achieve their personal and professional goals, regardless of their background or circumstances.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-brand-blue-light"></div>
                <CardContent className="pt-8">
                  <Target className="h-12 w-12 text-brand-blue-light mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    A world where access to quality education is a right, not a privilege – where everyone can learn, grow, and contribute to society through personalized educational experiences that adapt to their unique needs and aspirations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Core Values */}
        <section className="py-16 md:py-24 bg-brand-blue-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold mb-4">Our Core Values</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-90">
                These principles guide everything we do at EduPlatform, from course development to student support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-4">Meet Our Team</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Passionate educators, technologists, and visionaries committed to transforming how the world learns.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                  <div className="aspect-square">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue-dark mb-1">{member.name}</h3>
                    <p className="text-brand-teal font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10">
                <Link to="/team">View Full Team</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Milestones Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-12 text-center">Our Journey</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-brand-teal/30"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    {/* Year bubble */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold z-10">
                      {milestone.year}
                    </div>
                    
                    {/* Content box */}
                    <div className={`w-5/12 bg-white p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'text-right mr-8' : 'text-left ml-8'}`}>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Statistics */}
        <section className="py-16 bg-brand-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">250K+</div>
                <div className="text-white/80">Global Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/80">Expert Instructors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-white/80">Unique Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30+</div>
                <div className="text-white/80">Countries Reached</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-6">Join Us in Transforming Education</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you're a student, instructor, or passionate about education, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-brand-teal hover:bg-opacity-90 text-white">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-blue-dark text-brand-blue-dark hover:bg-brand-blue-dark/10">
                <Link to="/teach">Become an Instructor</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
