import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Download,
  FileDigit,
  Calendar,
  Tag,
  Sparkles,
  BookOpen,
  Grid3X3,
  ListFilter,
  ShoppingCart,
} from 'lucide-react'
import Navbar from '../../components/common/Navbar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { useSelector } from 'react-redux'
import static_resource from '../../static/static_resource.json'
import config from '../../config'
import { makeAPICall } from '../../utils/api'
import { toast } from 'sonner'
import publicApi from '../../utils/publicApi'
import resourcesData from '../../static/courses.json'
import dayjs from 'dayjs'
import { isNullOrUndefined } from '../../utils'

const ResourceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resource, setResource] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(true)
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const { token } = useSelector((state: any) => state.tokenReducer)

  const resourceId = parseInt(id || '0')

  const rzp1Ref = useRef<any>(null)

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

  const handleDownload = () => {
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

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return (
          <FileDigit
            size={16}
            className="text-red-500"
          />
        )
      case 'E-Book':
        return (
          <BookOpen
            size={16}
            className="text-indigo-500"
          />
        )
      case 'Template':
        return (
          <Grid3X3
            size={16}
            className="text-green-500"
          />
        )
      case 'Cheat Sheet':
        return (
          <ListFilter
            size={16}
            className="text-amber-500"
          />
        )
      default:
        return (
          <FileDigit
            size={16}
            className="text-gray-500"
          />
        )
    }
  }

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Data Analysis':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
      case 'AI & Data Science':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700'
      case 'Career Advice':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
      case 'SQL':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700'
      case 'Python':
        return 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700'
      case 'Interview Questions':
        return 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700'
      case 'Power BI':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700'
      case 'Machine Learning':
        return 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
    }
  }

  // Function to determine if we show full content or a preview
  const getDisplayContent = () => {
    if (!resource) return ''

    // For free resources, always show the full content
    if (resource.isFree) return resource.content

    // For paid resources, show a preview (first section only)
    if (!showPreview) return resource.content

    // Extract just the first section for the preview
    const contentSections = resource.content.split('<h2>')
    if (contentSections.length <= 1) return resource.content

    // Return the introduction and first section
    return contentSections[0] + '<h2>' + contentSections[1]
  }

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {!loading && <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-gray-100"
          onClick={() => navigate('/resources')}
        >
          <ArrowRight
            className="mr-2 rotate-180"
            size={16}
          />
          Back to Resources
        </Button>

        {<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {getResourceTypeIcon(resource.type)}
                  <span className="ml-1">{resource.type}</span>
                </div>
                {resource.featured && (
                  <Badge className="bg-edtech-teal text-white border-none">
                    <Sparkles
                      size={12}
                      className="mr-1"
                    />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-edtech-blue-dark leading-tight">{resource.title}</h1>

              <div className="flex items-center text-sm text-gray-500">
                <Calendar
                  size={14}
                  className="mr-1"
                />
                <span>{resource.date}</span>
                <span className="mx-2">•</span>
                <span>{resource?.downloads?.toLocaleString() ?? 23} downloads</span>
              </div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden shadow-md">
              <img
                src={resource.image_url}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-edtech-blue-dark mb-4">About This Resource</h2>
              <p className="text-edtech-blue-medium mb-6">{resource.description}</p>

              <div
                className="prose prose-lg max-w-none prose-headings:text-edtech-blue-dark prose-a:text-edtech-teal"
                // dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
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
                      className="bg-edtech-primary hover:bg-edtech-primary/90 text-white"
                    >
                      <ShoppingCart
                        size={18}
                        className="mr-2"
                      />
                      Get Access for ₹{resource.price}
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
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50 text-lg px-4 py-1"
                    >
                      Free Resource
                    </Badge>
                  ) : (
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 bg-blue-50 text-lg px-4 py-1"
                      >
                        Premium Resource
                      </Badge>
                      <p className="text-2xl font-bold text-edtech-blue-dark">₹{resource.price}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-edtech-blue-dark">Resource Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Tag
                        size={14}
                        className="mr-2 text-edtech-teal"
                      />
                      <span>Category:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource.category}</span>

                    <div className="flex items-center text-gray-500">
                      <FileDigit
                        size={14}
                        className="mr-2 text-edtech-teal"
                      />
                      <span>Type:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource?.type ?? 'PDF'}</span>

                    <div className="flex items-center text-gray-500">
                      <Calendar
                        size={14}
                        className="mr-2 text-edtech-teal"
                      />
                      <span>Date:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{dayjs(resource?.created_at).format('DD MMM YYYY')}</span>

                    <div className="flex items-center text-gray-500">
                      <Download
                        size={14}
                        className="mr-2 text-edtech-teal"
                      />
                      <span>Downloads:</span>
                    </div>
                    <span className="text-edtech-blue-dark">{resource?.downloads?.toLocaleString() ?? 23}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-edtech-primary hover:bg-edtech-primary/90 gap-2 py-6"
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
        </div>}

        {/* Related Resources Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-edtech-blue-dark">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourcesData
              .filter((r: any) => r.id !== resourceId && r.category === resource.category)
              .slice(0, 3)
              .map((relatedResource: any) => (
                <Card
                  key={relatedResource.course_id}
                  className="resource-card rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-edtech-teal/30 border border-gray-200/60 cursor-pointer"
                  onClick={() => navigate(`/resource/${relatedResource.course_id}`)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedResource.image_url}
                      alt={relatedResource.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                    {relatedResource.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-edtech-teal text-white border-none">
                          <Sparkles
                            size={12}
                            className="mr-1"
                          />
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
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200 bg-green-50"
                        >
                          Free
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200 bg-blue-50"
                        >
                          ₹{relatedResource.price}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-edtech-primary border-edtech-primary hover:bg-edtech-primary hover:text-white cursor-pointer"
                        onClick={() => navigate(`/resources/${relatedResource.course_id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>}
      {loading && <div className="container mx-auto px-4 py-12">
        <p>Loading resource...</p>
      </div>}
    </div>
  )
}

export default ResourceDetail
