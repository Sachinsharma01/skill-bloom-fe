
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Download, FileDigit, Calendar, Tag, Sparkles, BookOpen, Grid3X3, ListFilter, ShoppingCart } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useToast } from "../../hooks/use-toast";

// Sample resource data
const resourcesData = [
  {
    id: 1,
    title: "AI Engineer Roadmap 2025",
    category: "AI & Data Science",
    date: "March 18, 2025",
    image: "/lovable-uploads/18957b32-3f3a-4d55-a983-166ab37fbb3c.png",
    downloadLink: "/resource/1",
    featured: true,
    description: "Complete guide to becoming an AI Engineer in 2025 with step-by-step learning path.",
    downloads: 1205,
    type: "PDF",
    isFree: false,
    price: 29.99,
    content: `
    <h2>Introduction</h2>
    <p>This comprehensive roadmap outlines the skills, tools, and knowledge needed to become an AI Engineer in 2025. Whether you're just starting out or looking to pivot your career, this guide will help you navigate the rapidly evolving field of artificial intelligence.</p>
    
    <h2>Fundamental Skills</h2>
    <ul>
      <li>Strong foundation in Python programming</li>
      <li>Understanding of data structures and algorithms</li>
      <li>Knowledge of software engineering principles</li>
      <li>Familiarity with version control (Git)</li>
      <li>Solid mathematics background (linear algebra, calculus, probability)</li>
    </ul>
    
    <h2>Machine Learning Fundamentals</h2>
    <ul>
      <li>Supervised learning algorithms</li>
      <li>Unsupervised learning techniques</li>
      <li>Model evaluation and validation</li>
      <li>Feature engineering</li>
      <li>Hyperparameter tuning</li>
    </ul>
    
    <h2>Deep Learning Mastery</h2>
    <ul>
      <li>Neural network architectures</li>
      <li>Convolutional neural networks (CNNs)</li>
      <li>Recurrent neural networks (RNNs)</li>
      <li>Transformers and attention mechanisms</li>
      <li>Generative models (GANs, VAEs, Diffusion models)</li>
    </ul>
    
    <h2>Tools and Frameworks</h2>
    <ul>
      <li>TensorFlow and Keras</li>
      <li>PyTorch</li>
      <li>Hugging Face transformers</li>
      <li>MLflow for experiment tracking</li>
      <li>DVC for data version control</li>
    </ul>
    
    <h2>Model Deployment</h2>
    <ul>
      <li>Model serving (TensorFlow Serving, TorchServe)</li>
      <li>Containerization with Docker</li>
      <li>Orchestration with Kubernetes</li>
      <li>Cloud platforms (AWS, GCP, Azure)</li>
      <li>MLOps best practices</li>
    </ul>
    
    <h2>Specialized Skills</h2>
    <ul>
      <li>Computer vision</li>
      <li>Natural language processing</li>
      <li>Reinforcement learning</li>
      <li>Time series analysis</li>
      <li>Generative AI</li>
    </ul>
    
    <h2>Projects to Build</h2>
    <p>This roadmap includes 10 hands-on projects of increasing complexity to apply your skills and build your portfolio.</p>
    `
  },
  {
    id: 2,
    title: "10 Common Mistakes Freshers Make in Their First Data Job",
    category: "Career Advice",
    date: "March 01, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/2",
    featured: false,
    description: "Learn from others' mistakes and accelerate your data career growth.",
    downloads: 832,
    type: "Checklist",
    isFree: true,
    price: 0,
    content: `
    <h2>Introduction</h2>
    <p>Starting your first data job is exciting but can also be overwhelming. This guide highlights common mistakes that fresh graduates make in their first data role and provides practical advice to avoid them.</p>
    
    <h2>Mistake #1: Focusing Too Much on Complex Algorithms</h2>
    <p>Many freshers try to implement complex algorithms when simpler ones would work better. Remember that in the real world, interpretability and reliability often matter more than squeezing out an extra 0.1% of accuracy.</p>
    
    <h2>Mistake #2: Not Understanding the Business Context</h2>
    <p>Technical skills are important, but understanding the business problem you're solving is equally critical. Take time to learn about the industry, company goals, and how your work contributes to business outcomes.</p>
    
    <h2>Mistake #3: Poor Data Exploration</h2>
    <p>Rushing into modeling without thoroughly exploring and understanding the data can lead to poor results. Always spend sufficient time on exploratory data analysis before jumping to conclusions.</p>
    
    <h2>Mistake #4: Neglecting Communication Skills</h2>
    <p>Technical brilliance is undermined if you can't effectively communicate your findings to non-technical stakeholders. Practice explaining complex concepts in simple terms.</p>
    
    <h2>Mistake #5: Not Asking Questions</h2>
    <p>Many freshers hesitate to ask questions fearing they'll look incompetent. Remember, asking thoughtful questions shows engagement and a desire to learn.</p>
    
    <h2>Mistake #6: Overcomplicating Solutions</h2>
    <p>Simple, maintainable solutions are often better than complex ones. Don't build a neural network when linear regression would suffice.</p>
    
    <h2>Mistake #7: Neglecting Version Control</h2>
    <p>Not using version control properly can lead to lost work and collaboration difficulties. Master Git from the beginning of your career.</p>
    
    <h2>Mistake #8: Poor Documentation Habits</h2>
    <p>Failing to document your code, analyses, and decisions can create problems for future you and your teammates. Develop good documentation habits early.</p>
    
    <h2>Mistake #9: Not Understanding Data Quality Issues</h2>
    <p>Real-world data is messy. Learn to identify and handle missing values, outliers, and inconsistencies effectively.</p>
    
    <h2>Mistake #10: Forgetting to Network</h2>
    <p>Building relationships within and outside your team is crucial for career growth. Attend company events, join communities, and connect with fellow data professionals.</p>
    `
  },
  {
    id: 3,
    title: "Data Analyst Roadmap 2025",
    category: "Data Analysis",
    date: "February 28, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/3",
    featured: true,
    description: "Comprehensive roadmap to become a professional Data Analyst in 2025.",
    downloads: 1643,
    type: "PDF",
    isFree: false,
    price: 19.99,
    content: "Detailed content for the Data Analyst Roadmap..."
  },
  {
    id: 4,
    title: "SQL Fundamentals for Data Scientists",
    category: "SQL",
    date: "February 15, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/4",
    featured: false,
    description: "Master essential SQL queries that every data scientist needs to know.",
    downloads: 740,
    type: "Cheat Sheet",
    isFree: true,
    price: 0,
    content: "Detailed content for SQL Fundamentals..."
  },
  {
    id: 5,
    title: "Python for Data Analysis Handbook",
    category: "Python",
    date: "February 10, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/5",
    featured: false,
    description: "A comprehensive handbook covering Pandas, NumPy, and data visualization with Python.",
    downloads: 1128,
    type: "E-Book",
    isFree: false,
    price: 24.99,
    content: "Detailed content for Python Handbook..."
  },
  {
    id: 6,
    title: "Top 50 Data Science Interview Questions",
    category: "Interview Questions",
    date: "January 30, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/6",
    featured: true,
    description: "Prepare for your next data science interview with these common questions and answers.",
    downloads: 975,
    type: "PDF",
    isFree: false,
    price: 14.99,
    content: "Detailed content for Interview Questions..."
  },
  {
    id: 7,
    title: "Power BI Dashboard Templates for Business",
    category: "Power BI",
    date: "January 25, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/7",
    featured: false,
    description: "Ready-to-use Power BI dashboard templates for business analytics and reporting.",
    downloads: 503,
    type: "Template",
    isFree: true,
    price: 0,
    content: "Detailed content for Power BI Templates..."
  },
  {
    id: 8,
    title: "Machine Learning Project Ideas with Source Code",
    category: "Machine Learning",
    date: "January 15, 2025",
    image: "/placeholder.svg",
    downloadLink: "/resource/8",
    featured: true,
    description: "Hands-on ML project ideas with complete source code to build your portfolio.",
    downloads: 1427,
    type: "Project Kit",
    isFree: false,
    price: 39.99,
    content: "Detailed content for ML Project Ideas..."
  }
];

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(true); // Controls whether to show preview or full content
  const resourceId = parseInt(id || '0');

  useEffect(() => {
    // Find the resource by ID
    const foundResource = resourcesData.find(r => r.id === resourceId);
    if (foundResource) {
      setResource(foundResource);
    } else {
      // Redirect to resources page if resource not found
      navigate('/resources');
    }
  }, [resourceId, navigate]);

  const handleDownload = () => {
    if (resource.isFree) {
      // For free resources, show download toast and trigger download
      toast({
        title: "Download started",
        description: `${resource.title} is downloading...`,
      });
      
      // Simulate a download by creating a temporary link
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/placeholder.svg'; // In a real app, this would be a real file URL
        link.download = `${resource.title.replace(/\s+/g, '_')}.${resource.type.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);
    } else {
      // For paid resources, redirect to payment page
      navigate(`/payment/${resource.id}`);
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch(type) {
      case 'PDF':
        return <FileDigit size={16} className="text-red-500" />;
      case 'E-Book':
        return <BookOpen size={16} className="text-indigo-500" />;
      case 'Template':
        return <Grid3X3 size={16} className="text-green-500" />;
      case 'Cheat Sheet':
        return <ListFilter size={16} className="text-amber-500" />;
      default:
        return <FileDigit size={16} className="text-gray-500" />;
    }
  };

  const getCategoryClass = (category: string) => {
    switch(category) {
      case 'Data Analysis':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700';
      case 'AI & Data Science':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700';
      case 'Career Advice':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700';
      case 'SQL':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700';
      case 'Python':
        return 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700';
      case 'Interview Questions':
        return 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700';
      case 'Power BI':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700';
      case 'Machine Learning':
        return 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700';
    }
  };

  // Function to determine if we show full content or a preview 
  const getDisplayContent = () => {
    if (!resource) return '';
    
    // For free resources, always show the full content
    if (resource.isFree) return resource.content;
    
    // For paid resources, show a preview (first section only)
    if (!showPreview) return resource.content;
    
    // Extract just the first section for the preview
    const contentSections = resource.content.split('<h2>');
    if (contentSections.length <= 1) return resource.content;
    
    // Return the introduction and first section
    return contentSections[0] + '<h2>' + contentSections[1];
  };

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <p>Loading resource...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100"
          onClick={() => navigate('/resources')}
        >
          <ArrowRight className="mr-2 rotate-180" size={16} />
          Back to Resources
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getCategoryClass(resource.category)}`}>
                  {resource.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {getResourceTypeIcon(resource.type)}
                  <span className="ml-1">{resource.type}</span>
                </div>
                {resource.featured && (
                  <Badge className="bg-edtech-teal text-white border-none">
                    <Sparkles size={12} className="mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-edtech-blue-dark leading-tight">
                {resource.title}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>{resource.date}</span>
                <span className="mx-2">•</span>
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
            
            <div className="aspect-video rounded-xl overflow-hidden shadow-md">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-edtech-blue-dark mb-4">About This Resource</h2>
              <p className="text-edtech-blue-medium mb-6">{resource.description}</p>
              
              <div 
                className="prose prose-lg max-w-none prose-headings:text-edtech-blue-dark prose-a:text-edtech-teal"
                dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
              ></div>
              
              {/* Preview notice for paid resources */}
              {!resource.isFree && showPreview && (
                <div className="mt-8 p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                  <p className="text-center text-gray-600 mb-4">
                    This is a preview of the resource. Purchase to access the full content.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleDownload}
                      className="bg-edtech-teal hover:bg-edtech-teal/90 text-white"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Get Access for ${resource.price}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-4 space-y-6">
            <Card className="sticky top-20 rounded-xl overflow-hidden border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  {resource.isFree ? (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-lg px-4 py-1">Free Resource</Badge>
                  ) : (
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-lg px-4 py-1">Premium Resource</Badge>
                      <p className="text-2xl font-bold text-edtech-blue-dark">${resource.price}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-edtech-blue-dark">Resource Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Tag size={14} className="mr-2 text-edtech-teal" />
                      <span>Category:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource.category}</span>
                    
                    <div className="flex items-center text-gray-500">
                      <FileDigit size={14} className="mr-2 text-edtech-teal" />
                      <span>Type:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource.type}</span>
                    
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-2 text-edtech-teal" />
                      <span>Date:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource.date}</span>
                    
                    <div className="flex items-center text-gray-500">
                      <Download size={14} className="mr-2 text-edtech-teal" />
                      <span>Downloads:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource.downloads.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-edtech-teal hover:bg-edtech-teal/90 gap-2 py-6"
                  onClick={handleDownload}
                >
                  {resource.isFree ? (
                    <>
                      <Download size={18} />
                      Download Now
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Get Access
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  By downloading this resource, you agree to our terms of service and privacy policy.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Resources Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-edtech-blue-dark">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourcesData
              .filter(r => r.id !== resourceId && r.category === resource.category)
              .slice(0, 3)
              .map(relatedResource => (
                <Card 
                  key={relatedResource.id} 
                  className="resource-card rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-edtech-teal/30 border border-gray-200/60 cursor-pointer"
                  onClick={() => navigate(`/resource/${relatedResource.id}`)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={relatedResource.image} 
                      alt={relatedResource.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                    {relatedResource.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-edtech-teal text-white border-none">
                          <Sparkles size={12} className="mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge className={`mb-2 ${getCategoryClass(relatedResource.category)}`}>
                      {relatedResource.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-edtech-blue-dark mb-2 line-clamp-2">
                      {relatedResource.title}
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      {relatedResource.isFree ? (
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Free</Badge>
                      ) : (
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">${relatedResource.price}</Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-edtech-teal border-edtech-teal hover:bg-edtech-teal hover:text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
