import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { CheckCircle, Users, TrendingUp, Zap, Star, Download, BookOpen, Briefcase } from 'lucide-react'
import Navbar from '../../components/common/Navbar'
import publicApi from '../../utils/publicApi'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import static_resource from '../../static/static_resource.json'
import { isNullOrUndefined } from '../../utils'
import { useSelector } from 'react-redux'
import { makeAPICall } from '../../utils/api'
import { toast } from 'sonner'
import resourcesData from '../../static/courses.json'
import config from '../../config'

const ResourceDetailsNew = () => {
  const [resource, setResource] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const { token } = useSelector((state: any) => state.tokenReducer)

  const resourceId = parseInt(id || '0')

  const rzp1Ref = useRef<any>(null)
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = static_resource.razorpayScript
    script.async = true
    // script.onload = scriptLoaded
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    publicApi.getResource(resourceId).then((res: any) => {
      console.log('res', res)
      res.json().then((data: any) => {
        setResource(data.data)
        setLoading(false)
      })
    })
  }, [resourceId])

  const handlePurchase = () => {
    if (isNullOrUndefined(token)) {
      toast.error('Please login to download the resource')
      return
    }
    makeAPICall(
      'createOrder',
      {
        course_id: resourceId + '',
        amount: resource?.price,
        user_id: user?.id + '',
      },
      token as string,
    ).then((order: any) => {
      const options = {
        key: config.razorpay.razorpayKey,
        currency: static_resource.currency,
        name: static_resource.companyName,
        image: static_resource.logoUrl,
        prefill: {
          name: user?.name ?? 'Demo User',
          email: user?.email ?? 'demo@gmail.com',
          contact: user?.mobile_number ?? '9999999999',
        },
        notes: {
          address: user?.address ?? 'India',
        },
        theme: static_resource.theme,
        amount: resource?.price * 100, // amount in paisa
        description: resource?.title,
        order_id: order.id,
        handler: function (response: any) {
          toast.success('Payment successful')
          makeAPICall('updateOrder', {
            id: order.id,
            razorpay_id: response.razorpay_order.id,
            payment_id: order.payment_id,
            status: 'success',
          }).then((order: any) => {
            console.log(order)
            toast.success('Purchase successful')
            rzp1Ref.current.close()
            navigate('/dashboard')
          })
        },
      }
      rzp1Ref.current = new (window as any).Razorpay(options)
      rzp1Ref.current.open()
    })
  }

  const benefits = [
    'Complete list of 500+ verified startups',
    'Founder contact information included',
    'Industry categorization and filtering',
    'Investment stage and funding details',
    'Growth metrics and key statistics',
    'Regular updates and new additions',
  ]

  const relatedResources = resourcesData
    .filter((r: any) => r.id !== resourceId && r?.category === resource?.category)
    .slice(0, 3)

  console.log('relatedResources', relatedResources)

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <p>Loading resource...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      {!loading && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-4 md:mb-6 bg-blue-500/30 text-white border-blue-300/30 hover:bg-blue-500/40 transition-colors text-sm md:text-base">
                  🚀 Perfect for Students & Professionals
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {resource.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
                  Get exclusive access to the most comprehensive list of innovative startups, perfect for students
                  exploring career opportunities and professionals seeking new ventures.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-8 px-4">
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold w-full sm:w-auto"
                    onClick={handlePurchase}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Get Access for ₹{resource.price}
                  </Button>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-sm md:text-base">4.9/5 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12 md:py-16">
            {/* Value Proposition */}
            <div className="max-w-6xl mx-auto mb-16 md:mb-20">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-4">
                  Why Students & Professionals Choose Our List
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                  Stop wasting time researching. Get immediate access to verified startup data that accelerates your
                  career decisions and business opportunities.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
                <div className="order-2 lg:order-1">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Students and professionals working together"
                    className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 w-full"
                  />
                </div>
                <div className="space-y-4 order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">What You'll Get Inside:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Verified Startups</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-gray-600">Industries</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                  <div className="text-gray-600">Job Opportunities</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-12 text-center text-white mb-16 md:mb-20 mx-4 md:mx-0">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Accelerate Your Career?</h3>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto">
                Join thousands of students and professionals who've transformed their opportunities with our
                comprehensive startup list.
              </p>
              <Button
                size="lg"
                className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold w-full sm:w-auto"
                onClick={handlePurchase}
              >
                <Download className="mr-3 h-5 md:h-6 w-5 md:w-6" />
                Get Access for ₹{resource.price}
              </Button>
              <p className="text-sm mt-4 text-blue-200">30-day money-back guarantee • Instant download</p>
            </div>

            {/* Related Resources */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900 px-4">
                Complete Your Career Toolkit
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
                {relatedResources.map((resource, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={resource.image_url}
                        alt={resource.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">{resource.title}</h4>
                      <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-bold text-blue-600">{resource.price}</span>
                        <Button
                          onClick={() => navigate(`/resources/${resource.course_id}`, { replace: true })}
                          className="bg-blue-600 hover:bg-blue-700 rounded-full px-4 md:px-6 text-sm md:text-base"
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
      )}
      {loading && (
        <div className="container mx-auto px-4 py-12">
          <p>Loading resource...</p>
        </div>
      )}
    </>
  )
}

export default ResourceDetailsNew
