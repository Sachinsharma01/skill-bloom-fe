import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Download,
  Tag,
  Calendar,
  ArrowUpDown,
  Grid3X3,
  ListFilter,
  BookOpen,
  FileDigit,
  Sparkles,
} from 'lucide-react'
import Navbar from '../../components/common/Navbar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { ScrollArea } from '../../components/ui/scroll-area'
import { useToast } from '../../hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination'
import publicApi from '../../utils/publicApi'
import resourcesData from '../../static/courses.json'

// TODO Replace with actual data from the database

// Category data with counts
const categoriesData = [
  { name: 'startups', count: 3 },
  { name: 'mncs', count: 1 },
  { name: 'product-based-companies', count: 1 },
  { name: 'interviews', count: 1 },
  // { name: "SQL", count: 8 },
  // { name: "Python", count: 5 },
  // { name: "Interview Questions", count: 3 },
  // { name: "Power BI", count: 2 },
  // { name: "Machine Learning", count: 2 }
]

const Resources: React.FC<{}> = () => {
  window.scrollTo({ top: 0, left: 0 })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('popular')
  const [viewType, setViewType] = useState('masonry')
  const [activeTab, setActiveTab] = useState('all')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [displayedResources, setDisplayedResources] = useState(resourcesData)
  const [resources, setResources] = useState([])
  const navigate = useNavigate()
  const { toast } = useToast()

  // Update displayed resources when filters change
  useEffect(() => {
    const fetchResources = async () => {
      const resources: any = await publicApi.getCourses()
      if (resources.success) {
        const data = await resources.json()
        setResources(data.data)
      }
    }
    fetchResources()
    let filtered = [...resourcesData]

    // Apply tab filter first
    if (activeTab === 'featured') {
      filtered = filtered.filter((resource: any) => resource.is_featured)
    }

    // Then apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Finally apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((resource) => resource.category === selectedCategory)
    }

    // Apply sorting
    filtered.sort((a: any, b: any) => {
      if (sortBy === 'popular') {
        return b.downloads - a.downloads
      } else if (sortBy === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }
      return 0
    })

    setDisplayedResources(filtered)
  }, [activeTab, searchQuery, selectedCategory, sortBy])

  // Animation effect for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.resource-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 },
    )

    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [viewType, displayedResources])

  const handleViewResource = (resource: any) => {
    navigate(`/resources/${resource.course_id}`)
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero section with animated background */}
      <div className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 bg-edtech-secondary text-white"></div>
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-edtech-teal/30 bg-edtech-teal/10 px-3 py-1 text-sm font-medium text-white hover:bg-edtech-primary hover:text-white transition-colors duration-300">
              <Sparkles
                size={16}
                className="mr-1"
              />
              Learning Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-edtech-blue-dark via-edtech-blue-medium to-edtech-teal bg-clip-text text-transparent">
              Level Up Your Skills
            </h1>
            <p className="text-white text-lg max-w-2xl leading-relaxed">
              Download free guides, templates, and interactive resources to accelerate your learning journey in data
              science, AI, and modern technology
            </p>

            {/* Search bar with focus effect */}
            <div
              className={`relative w-full max-w-2xl transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}
            >
              <input
                type="text"
                placeholder="Search for resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-5 py-4 pl-12 rounded-full border-2 border-gray-200 focus:border-edtech-teal focus:outline-none focus:ring-0 shadow-sm"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Tabs for different resource views */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TabsList className="bg-gray-100 p-1 rounded-full">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-edtech-blue-dark data-[state=active]:shadow-sm"
              >
                All Resources
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-edtech-blue-dark data-[state=active]:shadow-sm"
              >
                Featured
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[180px] rounded-full bg-white">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={14} />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="inline-flex items-center gap-1 bg-white border rounded-full p-1">
                <Button
                  variant={viewType === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewType('grid')}
                  className={`rounded-full ${viewType === 'grid' ? 'bg-edtech-teal hover:bg-edtech-teal/90' : ''}`}
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewType === 'masonry' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewType('masonry')}
                  className={`rounded-full ${viewType === 'masonry' ? 'bg-edtech-teal hover:bg-edtech-teal/90' : ''}`}
                >
                  <ListFilter size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Tab content */}
          <TabsContent
            value="all"
            className="mt-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-3 space-y-6">
                <Card className="rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200/60 shadow-sm">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-edtech-teal/10 to-edtech-blue-dark/10 p-4">
                      <h3 className="text-lg font-semibold text-edtech-blue-dark flex items-center">
                        <Tag
                          size={18}
                          className="mr-2 text-edtech-teal"
                        />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() =>
                              setSelectedCategory(category.name !== selectedCategory ? category.name : null)
                            }
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.name
                                ? 'bg-edtech-teal/10 text-edtech-teal font-medium'
                                : 'hover:bg-gray-100 text-edtech-blue-medium'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 ${
                                selectedCategory === category.name
                                  ? 'bg-edtech-teal/20 text-edtech-teal'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-edtech-blue-medium hover:text-edtech-teal"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats card */}
                {/* //! might require later */}
                {/* <Card className="rounded-xl overflow-hidden border-gray-200/60 shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-edtech-blue-dark mb-3">Resource Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Total Resources</span>
                        <span className="font-semibold text-edtech-blue-dark">{resourcesData.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Featured</span>
                        <span className="font-semibold text-edtech-blue-dark">
                          {resourcesData.filter((r) => r.featured).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Categories</span>
                        <span className="font-semibold text-edtech-blue-dark">{categoriesData.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Free Resources</span>
                        <span className="font-semibold text-edtech-teal">
                          {resourcesData.filter((r) => r.isFree).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              {/* Resources grid */}
              <div className="md:col-span-9">
                {viewType === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-edtech-teal/30 border border-gray-200/60"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={resource.image_url}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                          />
                          {resource.featured && (
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
                          <div className="absolute bottom-3 right-3 flex items-center bg-black/50 text-white text-xs rounded-full px-2 py-1 backdrop-blur-sm">
                            <Download
                              size={10}
                              className="mr-1"
                            />
                            {resource.downloads.toLocaleString()}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              {getResourceTypeIcon(resource.type)}
                              <span className="ml-1">{resource.type}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-edtech-blue-dark mb-2 line-clamp-2">
                            {resource.title}
                          </h3>
                          <p className="text-edtech-blue-medium text-sm mb-4 line-clamp-2">{resource.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar
                                size={12}
                                className="mr-1"
                              />
                              <span>{resource.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {resource.isFree ? (
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
                                  ${resource.price}
                                </Badge>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewResource(resource)}
                                className="text-black border-edtech-teal hover:bg-teal-500 hover:text-white"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden border-gray-200/60"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img
                              src={resource.image_url}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                            {resource.featured && (
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
                          <div className="flex-1 p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                {getResourceTypeIcon(resource.type)}
                                <span className="ml-1">{resource.type}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 ml-auto">
                                <Download
                                  size={12}
                                  className="mr-1"
                                />
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold text-edtech-blue-dark mb-2">{resource.title}</h3>
                            <p className="text-edtech-blue-medium mb-4">{resource.description}</p>
                            <div className="flex flex-wrap items-center justify-between mt-auto">
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar
                                  size={14}
                                  className="mr-1"
                                />
                                <span>{resource.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {resource.isFree ? (
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
                                    ₹{resource.price}
                                  </Badge>
                                )}
                                <Button
                                  onClick={() => handleViewResource(resource)}
                                  className="bg-teal-500 border-edtech-teal text-white hover:bg-teal-500"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {displayedResources.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60 shadow-sm p-8">
                    <Search
                      size={40}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-edtech-blue-dark">No resources found</h3>
                    <p className="text-edtech-blue-medium mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory(null)
                        setActiveTab('all')
                      }}
                      className="border-edtech-teal text-edtech-teal"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {displayedResources.length > 0 && (
                  <div className="mt-10">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            className="hover:text-edtech-teal"
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="bg-edtech-teal border-edtech-teal hover:bg-edtech-teal/90"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            className="hover:text-edtech-teal"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="featured"
            className="mt-0"
          >
            {/* Using the same structure as "all" tab but filtered for featured items */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3 space-y-6">
                {/* Same sidebar as in "all" tab */}
                <Card className="rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200/60 shadow-sm">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-edtech-teal/10 to-edtech-blue-dark/10 p-4">
                      <h3 className="text-lg font-semibold text-edtech-blue-dark flex items-center">
                        <Tag
                          size={18}
                          className="mr-2 text-edtech-teal"
                        />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() =>
                              setSelectedCategory(category.name !== selectedCategory ? category.name : null)
                            }
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.name
                                ? 'bg-edtech-teal/10 text-edtech-teal font-medium'
                                : 'hover:bg-gray-100 text-edtech-blue-medium'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 ${
                                selectedCategory === category.name
                                  ? 'bg-edtech-teal/20 text-edtech-teal'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-edtech-blue-medium hover:text-edtech-teal"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats card */}
                {/* <Card className="rounded-xl overflow-hidden border-gray-200/60 shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-edtech-blue-dark mb-3">Resource Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Featured Resources</span>
                        <span className="font-semibold text-edtech-blue-dark">
                          {resourcesData.filter((r) => r.featured).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Categories</span>
                        <span className="font-semibold text-edtech-blue-dark">
                          {new Set(resourcesData.filter((r) => r.featured).map((r) => r.category)).size}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Free Resources</span>
                        <span className="font-semibold text-edtech-teal">
                          {resourcesData.filter((r) => r.featured && r.isFree).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              <div className="md:col-span-9">
                {viewType === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-edtech-teal/30 border border-gray-200/60"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={resource.image_url}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-edtech-teal text-white border-none">
                              <Sparkles
                                size={12}
                                className="mr-1"
                              />
                              Featured
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center bg-black/50 text-white text-xs rounded-full px-2 py-1 backdrop-blur-sm">
                            <Download
                              size={10}
                              className="mr-1"
                            />
                            {resource.downloads.toLocaleString()}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              {getResourceTypeIcon(resource.type)}
                              <span className="ml-1">{resource.type}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-edtech-blue-dark mb-2 line-clamp-2">
                            {resource.title}
                          </h3>
                          <p className="text-edtech-blue-medium text-sm mb-4 line-clamp-2">{resource.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar
                                size={12}
                                className="mr-1"
                              />
                              <span>{resource.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {resource.isFree ? (
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
                                  ₹{resource.price}
                                </Badge>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewResource(resource)}
                                className="text-edtech-teal border-edtech-teal hover:bg-edtech-teal hover:text-white"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden border-gray-200/60"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img
                              src={resource.image_url}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-edtech-teal text-white border-none">
                                <Sparkles
                                  size={12}
                                  className="mr-1"
                                />
                                Featured
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                {getResourceTypeIcon(resource.type)}
                                <span className="ml-1">{resource.type}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 ml-auto">
                                <Download
                                  size={12}
                                  className="mr-1"
                                />
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold text-edtech-blue-dark mb-2">{resource.title}</h3>
                            <p className="text-edtech-blue-medium mb-4">{resource.description}</p>
                            <div className="flex flex-wrap items-center justify-between mt-auto">
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar
                                  size={14}
                                  className="mr-1"
                                />
                                <span>{resource.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {resource.isFree ? (
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
                                    ₹{resource.price}
                                  </Badge>
                                )}
                                <Button
                                  onClick={() => handleViewResource(resource)}
                                  className="bg-edtech-teal text-white hover:bg-edtech-teal/90"
                                >
                                  <Download
                                    size={16}
                                    className="mr-2"
                                  />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {displayedResources.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60 shadow-sm p-8">
                    <Search
                      size={40}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-edtech-blue-dark">No featured resources found</h3>
                    <p className="text-edtech-blue-medium mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory(null)
                        setActiveTab('all')
                      }}
                      className="border-edtech-teal text-edtech-teal"
                    >
                      See All Resources
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="recent"
            className="mt-0"
          >
            {/* Using the same structure as "all" tab but filtered for recent items */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3 space-y-6">
                {/* Same sidebar as in "all" tab */}
                <Card className="rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200/60 shadow-sm">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-edtech-teal/10 to-edtech-blue-dark/10 p-4">
                      <h3 className="text-lg font-semibold text-edtech-blue-dark flex items-center">
                        <Tag
                          size={18}
                          className="mr-2 text-edtech-teal"
                        />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() =>
                              setSelectedCategory(category.name !== selectedCategory ? category.name : null)
                            }
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.name
                                ? 'bg-edtech-teal/10 text-edtech-teal font-medium'
                                : 'hover:bg-gray-100 text-edtech-blue-medium'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 ${
                                selectedCategory === category.name
                                  ? 'bg-edtech-teal/20 text-edtech-teal'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-edtech-blue-medium hover:text-edtech-teal"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats card */}
                {/* <Card className="rounded-xl overflow-hidden border-gray-200/60 shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-edtech-blue-dark mb-3">Recent Resources</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Since Feb 2025</span>
                        <span className="font-semibold text-edtech-blue-dark">
                          {resourcesData.filter((r) => new Date(r.date) > new Date('2025-02-01')).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Featured</span>
                        <span className="font-semibold text-edtech-blue-dark">
                          {resourcesData.filter((r) => r.featured && new Date(r.date) > new Date('2025-02-01')).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-edtech-blue-medium">Free Resources</span>
                        <span className="font-semibold text-edtech-teal">
                          {resourcesData.filter((r) => r.isFree && new Date(r.date) > new Date('2025-02-01')).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              <div className="md:col-span-9">
                {viewType === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-edtech-teal/30 border border-gray-200/60"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                          />
                          {resource.featured && (
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
                          <div className="absolute bottom-3 right-3 flex items-center bg-black/50 text-white text-xs rounded-full px-2 py-1 backdrop-blur-sm">
                            <Download
                              size={10}
                              className="mr-1"
                            />
                            {resource.downloads.toLocaleString()}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              {getResourceTypeIcon(resource.type)}
                              <span className="ml-1">{resource.type}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-edtech-blue-dark mb-2 line-clamp-2">
                            {resource.title}
                          </h3>
                          <p className="text-edtech-blue-medium text-sm mb-4 line-clamp-2">{resource.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar
                                size={12}
                                className="mr-1"
                              />
                              <span>{resource.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {resource.isFree ? (
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
                                  ₹{resource.price}
                                </Badge>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewResource(resource)}
                                className="text-edtech-teal border-edtech-teal hover:bg-edtech-teal hover:text-white"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {displayedResources.map((resource: any) => (
                      <Card
                        key={resource.id}
                        className="resource-card opacity-0 rounded-xl overflow-hidden border-gray-200/60"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img
                              src={resource.image_url}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                            {resource.featured && (
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
                          <div className="flex-1 p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={`${getCategoryClass(resource.category)}`}>{resource.category}</Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                {getResourceTypeIcon(resource.type)}
                                <span className="ml-1">{resource.type}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 ml-auto">
                                <Download
                                  size={12}
                                  className="mr-1"
                                />
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold text-edtech-blue-dark mb-2">{resource.title}</h3>
                            <p className="text-edtech-blue-medium mb-4">{resource.description}</p>
                            <div className="flex flex-wrap items-center justify-between mt-auto">
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar
                                  size={14}
                                  className="mr-1"
                                />
                                <span>{resource.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {resource.isFree ? (
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
                                    ₹{resource.price}
                                  </Badge>
                                )}
                                <Button
                                  onClick={() => handleViewResource(resource)}
                                  className="bg-edtech-teal text-white hover:bg-edtech-teal/90"
                                >
                                  <Download
                                    size={16}
                                    className="mr-2"
                                  />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {displayedResources.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60 shadow-sm p-8">
                    <Search
                      size={40}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-edtech-blue-dark">No recent resources found</h3>
                    <p className="text-edtech-blue-medium mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory(null)
                        setActiveTab('all')
                      }}
                      className="border-edtech-teal text-edtech-teal"
                    >
                      See All Resources
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Resources
