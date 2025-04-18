import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const courses = [
  {
    id: 1,
    title: "Top Product Based Companies In India",
    description: "Explore the top product based companies in India and their unique offerings",
    category: "product",
    price: 29,
    duration: 1,
    level: "Intermediate",
    rating: 4.8,
    bestseller: true,
    reviews: 2478,
    instructor: "Akhil Dubey",
    originalPrice: 39,
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
    bestseller: true,
    reviews: 1245,
    instructor: "Akhil Dubey",
    originalPrice: 39,
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
    bestseller: false,
    reviews: 760,
    instructor: "Akhil Dubey",
    originalPrice: 39,
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
    bestseller: false,
    reviews: 530,
    instructor: "Akhil Dubey",
    originalPrice: 59,
    image: "https://cloud.appwrite.io/v1/storage/buckets/67fabed7002c52e15016/files/67fad7bd003385be8d1c/view?project=67fabe35003d5a3f0bb3&mode=admin"
  },
];

const FeaturedCourses = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-edtech-dark">
              Featured Courses
            </h2>
            <p className="text-lg text-edtech-secondary mt-2">
              Explore our most popular and highly-rated courses
            </p>
          </div>
          <div>
            <Button onClick={() => navigate('/resources')} variant="outline" className="border-edtech-primary text-edtech-primary hover:bg-edtech-primary hover:text-white">
              View All Resources
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="course-card overflow-hidden border-none shadow-md">
              <div className="aspect-video relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
                    Bestseller
                  </Badge>
                )}
                <Badge className="absolute top-3 right-3 bg-edtech-primary hover:bg-edtech-primary/90">
                  {course.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-yellow-500 font-bold">{course.rating}</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({course.reviews})</span>
                </div>
                <h3 className="font-bold text-lg text-edtech-dark mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline">
                    <span className="text-edtech-dark font-bold text-lg">₹{course.price}</span>
                    <span className="text-gray-500 line-through text-sm ml-2">₹{course.originalPrice}</span>
                  </div>
                  <Badge variant="outline" className="border-gray-300 text-gray-600">
                    {course.level}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
