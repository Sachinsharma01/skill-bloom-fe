import { 
    ArrowDownCircle, 
    Github, 
    Linkedin, 
    Mail, 
    ChevronRight, 
    ExternalLink, 
    Download,
    ArrowRight,
    CheckCircle,
    Code,
    Globe,
    GraduationCap
  } from "lucide-react";
  import { Button } from "../../components/ui/button";
  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
  import { Link } from "react-router-dom";
  import College from "../../components/portfolio/College";
  import { makeAPICall } from "../../utils/api";
  import { useSelector } from "react-redux";
  import { useToast } from "../../components/ui/use-toast";
  
  const Portfolio = () => {
    const [activeSection, setActiveSection] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [portfolioData, setPortfolioData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const { token } = useSelector((state: any) => state.tokenReducer);
    const { user } = useSelector((state: any) => state.metaDataReducer);
  
    // Fetch portfolio data
    useEffect(() => {
      const fetchPortfolioData = async () => {
        try {
          if (!user?.portfolio_id) {
            toast({
              title: 'No Portfolio Data',
              description: 'Please fill out the form to generate a portfolio.',
              variant: 'destructive',
            });
            return;
          }

          const response = await makeAPICall('getPortfolio', { id: user.portfolio_id }, token as string);
          console.log('API Response:', response);

          if (response) {
            setPortfolioData(response);
          } else {
            toast({
              title: 'No Portfolio Data',
              description: 'Please fill out the form to generate a portfolio.',
              variant: 'destructive',
            });
          }
        } catch (error) {
          console.error('Error fetching portfolio data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load portfolio data. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchPortfolioData();
    }, [token, user?.portfolio_id, toast]);
  
    // Handle intersection observers for section highlighting
    useEffect(() => {
      const sections = document.querySelectorAll("section[id]");
      
      const observerOptions = {
        rootMargin: "-100px 0px -100px 0px",
        threshold: 0.15
      };
  
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach(section => observer.observe(section));
  
      return () => {
        sections.forEach(section => observer.unobserve(section));
      };
    }, []);
  
    // Handle scroll progress for progress bar
    useEffect(() => {
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse-slow text-xl font-medium text-theme-text-muted">Loading portfolio...</div>
        </div>
      );
    }

    if (!portfolioData) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">No Portfolio Data Available</h1>
          <Button onClick={() => window.location.href = '/'}>Create Portfolio</Button>
        </div>
      );
    }

    const { personal, skills, experience, projects, education } = portfolioData;
  
    // Project data
    const projectsData = [
      {
        id: "1",
        title: "E-commerce Dashboard",
        description: "A comprehensive admin dashboard for a large e-commerce platform, featuring real-time analytics, inventory management, and order processing.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&q=80",
        technologies: ["React", "TypeScript", "Redux"]
      },
      {
        id: "2",
        title: "Fitness Tracking App",
        description: "A mobile-first web application that helps users track workouts, set goals, and monitor their fitness progress with insightful visualizations.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop&q=80",
        technologies: ["Next.js", "Tailwind CSS", "Chart.js"]
      },
      {
        id: "3",
        title: "Online Learning Platform",
        description: "An interactive platform for course creators and students, featuring video lessons, quizzes, and progress tracking.",
        image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&h=300&fit=crop&q=80",
        technologies: ["React", "Firebase", "Node.js"]
      }
    ];
  
    // Skills data
    const skillsData = {
      frontend: ["React & Next.js", "TypeScript", "Tailwind CSS", "Redux & Context API", "HTML5 & CSS3"],
      tools: ["Git & GitHub", "Webpack & Vite", "Jest & Testing Library", "CI/CD Pipelines", "Figma & Adobe XD"],
      additional: ["Node.js & Express", "UI/UX Principles", "RESTful APIs", "Performance Optimization", "Responsive Design"]
    };
  
    // Experience data
    const experienceData = [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2021 - Present",
        description: "Led the frontend development team in building a next-generation SaaS platform. Implemented advanced React patterns, optimized performance, and established coding standards. Collaborated with design and backend teams to deliver features on tight deadlines."
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions Ltd.",
        period: "2019 - 2021",
        description: "Developed responsive web applications using React and TypeScript. Implemented state management solutions with Redux and Context API. Worked closely with UX designers to translate wireframes into functional interfaces."
      },
      {
        title: "Junior Web Developer",
        company: "Creative Digital Agency",
        period: "2018 - 2019",
        description: "Built client websites and web applications using HTML, CSS, and JavaScript. Gained experience with React fundamentals and responsive design principles. Collaborated with the design team to ensure pixel-perfect implementation."
      }
    ];
  
    const renderNavLink = (href: string, label: string) => {
      return (
        <li>
          <a 
            href={href} 
            className={`nav-link ${activeSection === href.substring(1) ? "text-theme-neon-green after:w-full" : ""}`}
          >
            {label}
          </a>
        </li>
      );
    };
  
    return (
      <div className="relative">
        {/* Progress bar */}
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-theme-neon-green z-50"
          style={{ width: `${scrollProgress}%`, transition: "width 0.1s" }}
        ></div>
  
        {/* Header/Navigation */}
        <header className="fixed top-0 w-full bg-theme-dark-blue/90 backdrop-blur-md z-40 shadow-md border-b border-theme-border-color">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl text-gradient">
                <span className="text-theme-text-light">John</span>
                <span className="text-theme-neon-green">Doe</span>
              </div>
              <nav className="hidden md:block">
                <ul className="flex gap-8">
                  {renderNavLink("#about", "About")}
                  {renderNavLink("#skills", "Skills")}
                  {renderNavLink("#projects", "Projects")}
                  {renderNavLink("#education", "Education")}
                  {renderNavLink("#experience", "Experience")}
                  {renderNavLink("#contact", "Contact")}
                </ul>
              </nav>
              <div className="md:hidden">
                {/* Mobile menu button would go here */}
              </div>
            </div>
          </div>
        </header>
  
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-grid z-0"></div>
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-theme-neon-green/10 rounded-full blur-3xl z-0"
            style={{ animation: "pulse 8s ease-in-out infinite" }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-theme-light-blue/10 rounded-full blur-3xl z-0"
            style={{ animation: "pulse 12s ease-in-out infinite" }}
          ></div>
  
          <div className="container mx-auto px-4 z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:w-1/2 mb-10 lg:mb-0"
              >
                <div className="mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-block py-1 px-3 text-sm bg-theme-card-bg text-theme-neon-green rounded-full mb-4 border border-theme-border-color"
                  >
                    Senior Frontend Developer
                  </motion.span>
                  
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  >
                    I build <span className="text-shimmer">exceptional</span> digital experiences
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                    className="text-lg md:text-xl text-theme-text-muted mb-8 max-w-2xl"
                  >
                    I'm Sachin Sharma, frontend developer specializing in building (and occasionally designing) 
                    exceptional websites, applications, and everything in between. Currently focused 
                    on building accessible, human-centered products.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button className="neo-btn rounded-lg text-base px-6 py-6">
                      Let's work together
                    </Button>
                    
                    <Button variant="outline" className="neo-btn rounded-lg flex items-center gap-2 text-base px-6 py-6">
                      <Download size={18} /> Download CV
                    </Button>
                  </motion.div>
                </div>
  
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="flex gap-6 items-center"
                >
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-theme-card-bg rounded-full flex items-center justify-center text-theme-neon-green hover:bg-theme-neon-green hover:text-theme-dark-blue transition-all border border-theme-border-color"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-theme-card-bg rounded-full flex items-center justify-center text-theme-neon-green hover:bg-theme-neon-green hover:text-theme-dark-blue transition-all border border-theme-border-color"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="mailto:hello@example.com"
                    className="w-10 h-10 bg-theme-card-bg rounded-full flex items-center justify-center text-theme-neon-green hover:bg-theme-neon-green hover:text-theme-dark-blue transition-all border border-theme-border-color"
                  >
                    <Mail size={20} />
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-full h-full border-2 border-dashed border-theme-neon-green/30 rounded-full animate-spin-slow"></div>
                  <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-full border-[5px] border-theme-card-bg shadow-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-theme-neon-green/20 to-theme-light-blue/20 mix-blend-overlay"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=faces&q=100" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
  
                  {/* Tech stack floating elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 p-3 bg-theme-card-bg rounded-lg shadow-lg rotate-3 border border-theme-border-color"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-8 h-8" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-1/4 -left-6 p-3 bg-theme-card-bg rounded-lg shadow-lg -rotate-6 border border-theme-border-color"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-8 h-8" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-1/4 -right-6 p-3 bg-theme-card-bg rounded-lg shadow-lg rotate-6 border border-theme-border-color"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind" className="w-8 h-8" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
  
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <a href="#about" className="flex flex-col items-center text-theme-text-muted hover:text-theme-neon-green">
                <span className="text-sm mb-2">Scroll Down</span>
                <ArrowDownCircle size={20} />
              </a>
            </div>
          </div>
        </section>
  
        {/* About Section */}
        <section id="about" className="section-spacing bg-theme-deep-navy relative">
          <div className="absolute inset-0 bg-dots opacity-50 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block"
              >
                About Me
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Get to <span className="text-gradient">Know Me</span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-1 bg-theme-neon-green mx-auto mb-10 origin-left"
              ></motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-theme-text-muted"
              >
                Get to know more about me, my experience, and my approach to development
              </motion.p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-theme-neon-green/20 to-theme-light-blue/20 rounded-lg transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=750&fit=crop&q=80" 
                  alt="About me" 
                  className="rounded-lg shadow-lg relative z-10 w-full object-cover border border-theme-border-color"
                />
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-theme-text-light">
                  A passionate Frontend Developer based in New York
                </h3>
                
                <p className="text-theme-text-muted mb-6">
                  I'm a Senior Frontend Developer with over 7 years of experience crafting beautiful, 
                  functional, and user-friendly web applications. My journey in web development 
                  began with a passion for creating interfaces that are both visually appealing 
                  and highly functional.
                </p>
                
                <p className="text-theme-text-muted mb-6">
                  Throughout my career, I've worked with companies ranging from startups to large 
                  enterprises, helping them build products that users love. I specialize in React, 
                  TypeScript, and modern frontend frameworks, with a keen interest in performance 
                  optimization and accessibility.
                </p>
  
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="font-semibold mb-1 text-theme-neon-green">Name:</p>
                    <p className="text-theme-text-light">{personal.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-theme-neon-green">Email:</p>
                    <p className="text-theme-text-light">{personal.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-theme-neon-green">Location:</p>
                    <p className="text-theme-text-light">{personal.location}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-theme-neon-green">Availability:</p>
                    <p className="text-theme-text-light">{personal.availability}</p>
                  </div>
                </div>
  
                <Button asChild className="neo-btn">
                  <a href="#contact" className="flex items-center gap-2">
                    Contact Me <ArrowRight size={16} />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
  
        {/* Skills Section */}
        <section id="skills" className="section-spacing bg-theme-dark-blue relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-theme-deep-navy"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-theme-deep-navy"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block"
              >
                My Expertise
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Skills & <span className="text-gradient">Expertise</span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-1 bg-theme-neon-green mx-auto mb-10 origin-left"
              ></motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-theme-text-muted"
              >
                I've worked with a variety of technologies and tools in the web development ecosystem
              </motion.p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Frontend Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-theme-card-bg p-8 rounded-lg shadow-soft gradient-border"
              >
                <div className="mb-6 p-4 bg-theme-neon-green/10 inline-block rounded-lg border border-theme-neon-green/20">
                  <Code size={24} className="text-theme-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-theme-text-light mb-4">
                  Frontend Development
                </h3>
                <ul className="space-y-2">
                  {skillsData.frontend.map((skill, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle size={16} className="text-theme-neon-green flex-shrink-0" />
                      <span className="text-theme-text-muted">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-theme-card-bg p-8 rounded-lg shadow-soft gradient-border"
              >
                <div className="mb-6 p-4 bg-theme-neon-green/10 inline-block rounded-lg border border-theme-neon-green/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-theme-neon-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-theme-text-light mb-4">
                  Tools & Workflow
                </h3>
                <ul className="space-y-2">
                  {skillsData.tools.map((skill, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle size={16} className="text-theme-neon-green flex-shrink-0" />
                      <span className="text-theme-text-muted">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Additional Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-theme-card-bg p-8 rounded-lg shadow-soft gradient-border"
              >
                <div className="mb-6 p-4 bg-theme-neon-green/10 inline-block rounded-lg border border-theme-neon-green/20">
                  <Globe size={24} className="text-theme-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-theme-text-light mb-4">
                  Additional Skills
                </h3>
                <ul className="space-y-2">
                  {skillsData.additional.map((skill, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle size={16} className="text-theme-neon-green flex-shrink-0" />
                      <span className="text-theme-text-muted">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
  
            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="bg-theme-card-bg p-6 rounded-lg border border-theme-border-color">
                <h3 className="text-xl font-semibold text-theme-text-light mb-6">Technical Proficiency</h3>
                
                <div className="space-y-6">
                  {[
                    { name: "React & Next.js", percentage: 95 },
                    { name: "TypeScript", percentage: 90 },
                    { name: "UI/UX Design", percentage: 85 },
                    { name: "Backend Development", percentage: 75 }
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-theme-text-light">{skill.name}</span>
                        <span className="text-theme-neon-green">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-theme-dark-blue h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          className="h-full bg-gradient-to-r from-theme-neon-green to-theme-light-blue rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
  
        {/* Projects Section */}
        <section id="projects" className="section-spacing bg-theme-deep-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block"
              >
                My Work
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Recent <span className="text-gradient">Projects</span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-1 bg-theme-neon-green mx-auto mb-10 origin-left"
              ></motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-theme-text-muted"
              >
                Here are some of the projects I've worked on recently
              </motion.p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projectsData.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card group"
                >
                  <div className="relative overflow-hidden h-56">
                    <div className="absolute inset-0 bg-theme-dark-blue/50 group-hover:bg-theme-dark-blue/20 transition-all duration-300 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-dark-blue via-transparent opacity-70"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-theme-text-light mb-2 group-hover:text-theme-neon-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-theme-text-muted text-sm mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-theme-border-color">
                      <Button 
                        variant="ghost" 
                        className="text-theme-neon-green p-0 hover:text-theme-light-blue hover:bg-transparent"
                        asChild
                      >
                        <Link to={`/project/${project.id}`} className="flex items-center gap-2">
                          <span>View Project</span>
                          <ChevronRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" className="neo-btn">View All Projects</Button>
            </div>
          </div>
        </section>
  
        {/* College Section */}
        <College />
  
        {/* Experience Section */}
        <section id="experience" className="section-spacing bg-theme-dark-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block"
              >
                Professional Journey
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Work <span className="text-gradient">Experience</span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-1 bg-theme-neon-green mx-auto mb-10 origin-left"
              ></motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-theme-text-muted"
              >
                My professional journey and career highlights
              </motion.p>
            </div>
  
            <div className="max-w-3xl mx-auto bg-theme-card-bg p-8 rounded-lg shadow-soft border border-theme-border-color">
              <div className="relative border-l-2 border-theme-neon-green pl-8 space-y-8">
                {experienceData.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="timeline-item"
                  >
                    <span className="absolute -left-3 p-2 bg-theme-neon-green text-theme-dark-blue text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="bg-theme-dark-blue p-6 rounded-lg border border-theme-border-color">
                      <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-theme-text-light">
                          {exp.title}
                        </h3>
                        <div className="text-sm text-theme-text-muted bg-theme-card-bg px-3 py-1 rounded-full shadow-sm inline-block md:block">
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-theme-neon-green font-medium mb-3">
                        {exp.company}
                      </p>
                      <p className="text-theme-text-muted">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
  
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <Button asChild variant="outline" className="neo-btn">
                <a 
                  href="/John-Doe-Resume.pdf" 
                  download 
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </section>
  
        {/* Contact Section */}
        <section id="contact" className="section-spacing bg-theme-deep-navy bg-grid">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-theme-neon-green text-sm uppercase tracking-wider mb-3 block"
              >
                Contact Me
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Get In <span className="text-gradient">Touch</span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-1 bg-theme-neon-green mx-auto mb-10 origin-left"
              ></motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-theme-text-muted"
              >
                I'm always open to new opportunities and interesting projects
              </motion.p>
            </div>
  
            <div className="max-w-4xl mx-auto">
              <div className="bg-theme-card-bg rounded-lg shadow-lg p-8 md:p-10 relative z-10 border border-theme-border-color">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-semibold text-theme-text-light mb-6">
                      Contact Information
                    </h3>
                    <p className="text-theme-text-muted mb-8">
                      Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-theme-neon-green/10 p-3 rounded-full text-theme-neon-green border border-theme-neon-green/20">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-theme-text-light mb-1">Email</h4>
                          <a href="mailto:hello@example.com" className="text-theme-text-muted hover:text-theme-neon-green">
                            hello@example.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-theme-neon-green/10 p-3 rounded-full text-theme-neon-green border border-theme-neon-green/20">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-theme-text-light mb-1">Phone</h4>
                          <a href="tel:+1234567890" className="text-theme-text-muted hover:text-theme-neon-green">
                            +1 (234) 567-890
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-theme-neon-green/10 p-3 rounded-full text-theme-neon-green border border-theme-neon-green/20">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-theme-text-light mb-1">Location</h4>
                          <p className="text-theme-text-muted">
                            New York, NY
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-theme-dark-blue hover:bg-theme-neon-green hover:text-theme-dark-blue text-theme-text-light transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-theme-border-color"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-theme-dark-blue hover:bg-theme-neon-green hover:text-theme-dark-blue text-theme-text-light transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-theme-border-color"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-theme-dark-blue hover:bg-theme-neon-green hover:text-theme-dark-blue text-theme-text-light transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-theme-border-color"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-theme-text-light mb-1">
                            Name
                          </label>
                          <input 
                            type="text" 
                            placeholder="Your name"
                            className="w-full px-4 py-2 rounded-lg border border-theme-border-color bg-theme-dark-blue text-theme-text-light focus:outline-none focus:ring-2 focus:ring-theme-neon-green/20 focus:border-theme-neon-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-theme-text-light mb-1">
                            Email
                          </label>
                          <input 
                            type="email" 
                            placeholder="Your email"
                            className="w-full px-4 py-2 rounded-lg border border-theme-border-color bg-theme-dark-blue text-theme-text-light focus:outline-none focus:ring-2 focus:ring-theme-neon-green/20 focus:border-theme-neon-green"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-theme-text-light mb-1">
                          Subject
                        </label>
                        <input 
                          type="text" 
                          placeholder="Subject"
                          className="w-full px-4 py-2 rounded-lg border border-theme-border-color bg-theme-dark-blue text-theme-text-light focus:outline-none focus:ring-2 focus:ring-theme-neon-green/20 focus:border-theme-neon-green"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-theme-text-light mb-1">
                          Message
                        </label>
                        <textarea 
                          placeholder="Your message"
                          rows={5}
                          className="w-full px-4 py-2 rounded-lg border border-theme-border-color bg-theme-dark-blue text-theme-text-light focus:outline-none focus:ring-2 focus:ring-theme-neon-green/20 focus:border-theme-neon-green"
                        ></textarea>
                      </div>
                      
                      <Button className="w-full bg-theme-neon-green hover:bg-theme-neon-green/80 text-theme-dark-blue">
                        Send Message
                      </Button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-theme-card-bg text-theme-text-light py-16 border-t border-theme-border-color">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="font-bold text-2xl text-gradient mb-2">
                  John<span className="text-theme-neon-green">Doe</span>
                </div>
                <p className="text-theme-text-muted">Frontend Developer</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-theme-text-light">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#about" className="text-theme-text-muted hover:text-theme-neon-green">About</a></li>
                    <li><a href="#skills" className="text-theme-text-muted hover:text-theme-neon-green">Skills</a></li>
                    <li><a href="#projects" className="text-theme-text-muted hover:text-theme-neon-green">Projects</a></li>
                    <li><a href="#education" className="text-theme-text-muted hover:text-theme-neon-green">Education</a></li>
                    <li><a href="#experience" className="text-theme-text-muted hover:text-theme-neon-green">Experience</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-theme-text-light">Contact</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Mail size={16} className="text-theme-neon-green" />
                      <span className="text-theme-text-muted">hello@example.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-neon-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="text-theme-text-muted">New York, NY</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-theme-text-light">Follow Me</h4>
                  <div className="flex gap-3">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-theme-dark-blue hover:bg-theme-neon-green text-theme-text-light hover:text-theme-card-bg w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-theme-border-color"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-theme-dark-blue hover:bg-theme-neon-green text-theme-text-light hover:text-theme-card-bg w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-theme-border-color"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-theme-dark-blue hover:bg-theme-neon-green text-theme-text-light hover:text-theme-card-bg w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-theme-border-color"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-theme-border-color mt-12 pt-8 text-center">
              <p className="text-theme-text-muted">© {new Date().getFullYear()} John Doe. All rights reserved.</p>
            </div>
          </div>
        </footer>
  
        {/* Scroll to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-theme-neon-green text-theme-dark-blue w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-theme-light-blue z-50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    );
  };
  
  export default Portfolio;
  