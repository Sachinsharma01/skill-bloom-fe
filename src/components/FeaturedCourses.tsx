import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useEffect, useState } from 'react'
import publicApi from '../utils/publicApi'
import { Loader2 } from 'lucide-react'

const FeaturedCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    const fetchFeaturedCourses = async () => {
      try {
        const response: any = await publicApi.getFeaturedCourses()
        const data = await response.json()
        console.log('response', data)
        setCourses(data.data)
      } catch (error) {
        console.error('Error fetching featured courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedCourses()
  }, [])

  const navigate = useNavigate()
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-edtech-dark">Featured Courses</h2>
                <p className="text-lg text-edtech-secondary mt-2">Explore our most popular and highly-rated courses</p>
              </div>
              <div>
                <Button
                  onClick={() => navigate('/resources')}
                  variant="outline"
                  className="border-edtech-primary text-edtech-primary hover:bg-edtech-primary hover:text-white"
                >
                  View All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="course-card overflow-hidden border-none shadow-md"
                >
                  <div className="aspect-video relative">
                    <img
                      src={course.course.image_url}
                      alt={course.course.title}
                      className="w-full h-full object-cover"
                    />
                    {(course.bestseller ? true : false) && (
                      <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">Bestseller</Badge>
                    )}
                    <Badge className="absolute top-3 right-3 bg-edtech-primary hover:bg-edtech-primary/90">
                      {course.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-yellow-500 font-bold">{course.course.rating}</span>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({course.course.reviews ?? 20})</span>
                    </div>
                    <h3 className="font-bold text-lg text-edtech-dark mb-1 line-clamp-2">{course.course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {course.course.author}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-baseline">
                        <span className="text-edtech-dark font-bold text-lg">₹{course.course.price}</span>
                        <span className="text-gray-500 line-through text-sm ml-2">
                          ₹{course.course.originalPrice ?? course.course.price * 1.5}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-gray-300 text-gray-600"
                      >
                        {course.course.level ?? 'Beginner'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default FeaturedCourses
