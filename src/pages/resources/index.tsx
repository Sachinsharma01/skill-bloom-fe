
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Video, Award, Calendar, Search, Users } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Slider } from '../../components/ui/slider';
import { Label } from '../../components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../components/ui/pagination';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Top Product Based Companies In India",
    description: "Explore the top product based companies in India and their unique offerings",
    category: "product-based-companies",
    price: 29,
    duration: 1,
    level: "Intermediate",
    rating: 4.8,
    students: 1245,
    instructor: "Akhil Dubey",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fac409000129a7563e/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
  {
    id: 2,
    title: "Top MNCs In India",
    description: "Explore the top product based companies in India and their unique offerings",
    category: "mncs",
    price: 29,
    duration: 6,
    level: "Beginner",
    rating: 4.7,
    students: 850,
    instructor: "Akhil Dubey",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fac71c00097f6a2304/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
  {
    id: 3,
    title: "Top Hyderabad Startups",
    description: "Explore the top startups in Hyderabad and their unique offerings",
    category: "startups",
    price: 19,
    duration: 14,
    level: "Advanced",
    rating: 4.9,
    students: 760,
    instructor: "Akhil Dubey",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fad4750020d46c3c04/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
  {
    id: 4,
    title: "Top Chennai Startups",
    description: "Explore the top startups in Chennai and their unique offerings",
    category: "startups",
    price: 19,
    duration: 20,
    level: "Intermediate",
    rating: 4.6,
    students: 530,
    instructor: "Akhil Dubey",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fad7bd003385be8d1c/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
  {
    id: 5,
    title: "Top Startups In India",
    description: "Explore the top startups in India and their unique offerings",
    category: "startups",
    price: 19,
    duration: 5,
    level: "Beginner",
    rating: 4.5,
    students: 1890,
    instructor: "Emma Rodriguez",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fad925001c8970148f/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
];

const popularCategories = [
  { name: "Product Based Companies", icon: <Book className="h-8 w-8 text-brand-teal" />, count: 42, slug: "product-based-companies" },
  { name: "MNCs", icon: <Video className="h-8 w-8 text-brand-teal" />, count: 38, slug: "mncs" },
  { name: "Startups", icon: <Award className="h-8 w-8 text-brand-teal" />, count: 24, slug: "startups" },
  { name: "Hyderabad Startups", icon: <Calendar className="h-8 w-8 text-brand-teal" />, count: 19, slug: "hyderabad-startups" }
];

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [showOnlyLive, setShowOnlyLive] = useState(false);
  const [previewCourse, setPreviewCourse] = useState<any | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Filter courses based on search, category, price, etc.
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleCoursePreview = (course: any) => {
    setPreviewCourse(course);
    setShowPreview(true);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-edtech-dark to-edtech-secondary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Discover Your Next Learning Adventure</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Explore our cutting-edge courses, intensive bootcamps, and value-packed combo deals designed for the modern learner.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search for courses, bootcamps, or topics..."
              className="pl-12 pr-4 py-6 text-lg text-brand-blue-dark"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-blue-light h-5 w-5" />
          </div>
        </div>
      </div>
      
      {/* Featured Categories Section */}
      {/* <div className="py-16 px-4 bg-brand-gray-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-10 text-center">Popular Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link to={`/category/${category.slug}`} key={index} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:-translate-y-1 transform transition-transform">
                  <CardContent className="flex flex-col items-center justify-center text-center pt-6">
                    <div className="bg-brand-gray-medium rounded-full p-4 mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-brand-blue-dark">{category.name}</h3>
                    <p className="text-brand-blue-light">{category.count} courses</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
      
      {/* Main Courses Section with Filters */}
      <div className="py-16 px-4 bg-brand-gray-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-8">All Learning Opportunities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl text-brand-blue-dark">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium text-brand-blue-dark mb-3">Category</h3>
                    <div className="space-y-2">
                      {['all', 'startups', 'product-based-companies', 'mncs'].map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="radio"
                            id={category}
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="mr-2 h-4 w-4 text-brand-teal"
                          />
                          <label htmlFor={category} className="text-brand-blue-light capitalize">
                            {category === 'all' ? 'All Categories' : category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <h3 className="font-medium text-brand-blue-dark">Price Range</h3>
                      <span className="text-sm text-brand-blue-light">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 400]}
                      max={400}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Live Classes Toggle */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="live-mode" className="text-brand-blue-dark font-medium">
                      Live Classes Only
                    </Label>
                    <Switch
                      id="live-mode"
                      checked={showOnlyLive}
                      onCheckedChange={setShowOnlyLive}
                    />
                  </div>
                  
                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-brand-blue-light text-brand-blue-light"
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange([0, 400]);
                      setShowOnlyLive(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Course Grid */}
            <div className="lg:col-span-3">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-brand-blue-dark mb-2">No courses found</h3>
                  <p className="text-brand-blue-light">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-48">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div 
                            className="absolute top-3 left-3 bg-white text-brand-blue-dark px-3 py-1 rounded-full text-xs font-bold uppercase cursor-pointer hover:bg-brand-teal hover:text-white transition-colors"
                            onClick={() => navigate(`/category/${course.category}`)}
                          >
                            {course.category}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-2 text-lg text-brand-blue-dark">{course.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-brand-blue-light">{course.instructor}</span>
                            <span className="flex items-center text-brand-blue-light">
                              <Users className="h-4 w-4 mr-1" />
                              {course.students}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-brand-blue-light">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {course.duration} weeks
                            </span>
                            <span className="flex items-center">
                              <Award className="h-4 w-4 mr-1" />
                              {course.rating}/5
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-brand-gray-medium/50">
                          <div className="flex items-center justify-between w-full">
                            <div className="font-bold text-lg text-brand-teal">₹{course.price}</div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-brand-teal text-brand-teal"
                                onClick={() => handleCoursePreview(course)}
                              >
                                Preview
                              </Button>
                              <Button 
                                asChild 
                                size="sm" 
                                className="bg-brand-teal hover:bg-opacity-90"
                              >
                                <Link to={`/courses/${course.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          {previewCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{previewCourse.title}</DialogTitle>
                <DialogDescription>{previewCourse.description}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                  <div className="aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={previewCourse.image}
                      alt={previewCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-brand-blue-light">Instructor:</span>
                      <p className="font-medium">{previewCourse.instructor}</p>
                    </div>
                    <div>
                      <span className="text-brand-blue-light">Level:</span>
                      <p className="font-medium">{previewCourse.level}</p>
                    </div>
                    <div>
                      <span className="text-brand-blue-light">Duration:</span>
                      <p className="font-medium">{previewCourse.duration} weeks</p>
                    </div>
                    <div>
                      <span className="text-brand-blue-light">Rating:</span>
                      <p className="font-medium">{previewCourse.rating}/5</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">What you'll learn:</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                        <span>Comprehensive understanding of {previewCourse.category === 'bootcamp' ? 'development fundamentals' : previewCourse.title}</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                        <span>Hands-on experience through real-world projects</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                        <span>Industry best practices and professional workflows</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="text-3xl font-bold text-brand-teal">₹{previewCourse.price}</div>
                    <Button 
                      asChild 
                      className="w-full bg-brand-teal hover:bg-opacity-90"
                    >
                      <Link to={previewCourse.category === 'bootcamp' ? `/bootcamp/${previewCourse.id}` : `/courses/${previewCourse.id}`}>
                        {previewCourse.category === 'bootcamp' ? 'View Bootcamp' : 'View Course Details'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Call to Action */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl mb-8">
            Join thousands of students already learning with us. Get personalized recommendations and special offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-teal hover:bg-opacity-90 text-white">
              <Link to="/contact">
                Schedule a Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Courses;
