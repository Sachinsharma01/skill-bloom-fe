import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  BookmarkPlus, 
  MessageSquare, 
  Share2, 
  ChevronRight, 
  Flame,
  ArrowUpRight, 
  User,
  Tag,
  Heart 
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample blog post data
const blogPostsData = [
  {
    id: 1,
    title: "How AI is Transforming the Data Science Landscape in 2025",
    category: "AI & Data Science",
    author: "Dr. Sarah Mitchell",
    authorImage: "/placeholder.svg",
    authorRole: "Chief Data Scientist",
    date: "March 20, 2025",
    readTime: "8 min read",
    summary: "The field of data science is rapidly evolving with AI's integration. Discover the latest trends and how to stay ahead.",
    image: "/placeholder.svg",
    featured: true,
    trending: true,
    commentsCount: 24,
    likesCount: 156,
    saved: false,
    tags: ["AI", "Machine Learning", "Career"],
    content: `# How AI is Transforming the Data Science Landscape in 2025

## Introduction

The rapid evolution of artificial intelligence technologies has fundamentally altered the landscape of data science. As we move through 2025, the symbiotic relationship between AI and data science continues to deepen, creating new opportunities and challenges for professionals in the field.

## Automated Feature Engineering

One of the most significant advancements has been in automated feature engineering. AI systems can now identify relevant features from complex datasets with minimal human intervention, dramatically reducing the time spent on one of data science's most labor-intensive tasks.

### Key Impacts:
- 60% reduction in feature preparation time
- Identification of non-obvious feature relationships
- More accurate predictive models through comprehensive feature exploration

## Conversational Data Analysis

Natural language interfaces have revolutionized how professionals interact with data. Data scientists can now query complex datasets using conversational language, democratizing access to insights across organizations.

## AI-Augmented Decision Making

The integration of AI into decision-making processes has moved beyond simple automation to true augmentation. Modern systems provide context-aware recommendations while explaining their reasoning, helping data scientists make more informed decisions.

## The Changing Skill Requirements

With these advancements, the skill set required for data scientists has evolved. While deep statistical knowledge remains important, expertise in prompt engineering, AI system design, and ethical AI implementation have become equally valuable.

## Conclusion

As AI continues to transform the data science landscape, professionals who can adapt to these changes will find themselves at the forefront of innovation. The most successful data scientists of 2025 will be those who view AI not as a replacement, but as a powerful collaborative tool that enhances human creativity and expertise.`
  },
  {
    id: 2,
    title: "Top 5 Python Libraries Every Data Scientist Should Master in 2025",
    category: "Python",
    author: "Michael Chang",
    authorImage: "/placeholder.svg",
    authorRole: "Senior Python Developer",
    date: "March 15, 2025",
    readTime: "6 min read",
    summary: "The Python ecosystem continues to evolve. These five libraries are essential for any data scientist working with Python today.",
    image: "/placeholder.svg",
    featured: false,
    trending: true,
    commentsCount: 18,
    likesCount: 92,
    saved: false,
    tags: ["Python", "Programming", "Libraries"],
    content: "Full blog content will be displayed here."
  },
  {
    id: 3,
    title: "Breaking into Data Science: A Guide for Career Changers",
    category: "Career Advice",
    author: "Elena Rodriguez",
    authorImage: "/placeholder.svg",
    authorRole: "Career Coach",
    date: "March 10, 2025",
    readTime: "10 min read",
    summary: "Considering a career change to data science? This comprehensive guide will help you navigate the transition successfully.",
    image: "/placeholder.svg",
    featured: true,
    trending: false,
    commentsCount: 32,
    likesCount: 215,
    saved: false,
    tags: ["Career Change", "Education", "Job Search"],
    content: "Full blog content will be displayed here."
  },
  {
    id: 4,
    title: "Real-time Data Processing Architectures Compared",
    category: "Data Engineering",
    author: "Jamal Williams",
    authorImage: "/placeholder.svg",
    authorRole: "Lead Data Engineer",
    date: "March 5, 2025",
    readTime: "12 min read",
    summary: "An in-depth comparison of modern real-time data processing architectures, with benchmarks and use case recommendations.",
    image: "/placeholder.svg",
    featured: false,
    trending: true,
    commentsCount: 14,
    likesCount: 78,
    saved: false,
    tags: ["Data Engineering", "Architecture", "Performance"],
    content: "Full blog content will be displayed here."
  },
  {
    id: 5,
    title: "Ethical Considerations in Predictive Analytics",
    category: "Ethics",
    author: "Dr. Leila Chen",
    authorImage: "/placeholder.svg",
    authorRole: "Ethics Researcher",
    date: "February 28, 2025",
    readTime: "9 min read",
    summary: "As predictive analytics becomes more powerful, ethical considerations must be at the forefront of our work. Here's why it matters.",
    image: "/placeholder.svg",
    featured: true,
    trending: false,
    commentsCount: 27,
    likesCount: 134,
    saved: false,
    tags: ["Ethics", "Society", "Responsibility"],
    content: "Full blog content will be displayed here."
  },
  {
    id: 6,
    title: "The Future of Data Visualization: Beyond Charts and Graphs",
    category: "Data Visualization",
    author: "Thomas Wu",
    authorImage: "/placeholder.svg",
    authorRole: "Visualization Expert",
    date: "February 20, 2025",
    readTime: "7 min read",
    summary: "Data visualization is evolving beyond traditional charts and graphs. Discover the cutting-edge techniques reshaping how we visualize data.",
    image: "/placeholder.svg",
    featured: false,
    trending: true,
    commentsCount: 22,
    likesCount: 105,
    saved: false,
    tags: ["Visualization", "UX", "Design"],
    content: "Full blog content will be displayed here."
  }
];

// Categories with counts
const categoriesData = [
  { name: "All Posts", count: blogPostsData.length },
  { name: "AI & Data Science", count: 8 },
  { name: "Python", count: 6 },
  { name: "Career Advice", count: 5 },
  { name: "Data Engineering", count: 4 },
  { name: "Ethics", count: 3 },
  { name: "Data Visualization", count: 3 }
];

// Popular tags
const popularTags = [
  { name: "Python", count: 42 },
  { name: "Machine Learning", count: 36 },
  { name: "Career", count: 28 },
  { name: "AI", count: 25 },
  { name: "Data Visualization", count: 20 },
  { name: "Statistics", count: 18 },
  { name: "Big Data", count: 15 },
  { name: "Ethics", count: 12 }
];

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Find post from ID parameter if provided
  useEffect(() => {
    if (id) {
      const foundPost = blogPostsData.find(post => post.id === parseInt(id));
      if (foundPost) {
        setSelectedPost(foundPost);
      }
    } else {
      setSelectedPost(null);
    }
  }, [id]);

  // Filter blog posts based on search query, selected category, and active tab
  const filteredBlogPosts = blogPostsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'featured' && post.featured) ||
                      (activeTab === 'trending' && post.trending);
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleBookmark = (postId: number) => {
    toast({
      title: "Post saved",
      description: "The post has been added to your bookmarks",
    });
  };

  const handleLike = (postId: number) => {
    toast({
      title: "Post liked",
      description: "Thanks for your feedback!",
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Share link copied",
      description: "Link has been copied to clipboard",
    });
  };

  const handleCategorySelect = (category: string) => {
    if (category === "All Posts") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleReadPost = (post) => {
    navigate(`/blog/${post.id}`);
  };

  // If a specific post is selected, show the full post view
  if (selectedPost) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-gray-100"
            onClick={() => navigate('/blog')}
          >
            <ChevronRight className="mr-2 rotate-180" size={16} />
            Back to all posts
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-8">
              {/* Post header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-100 text-blue-700">{selectedPost.category}</Badge>
                  <span className="text-sm text-gray-500">{selectedPost.readTime}</span>
                  {selectedPost.trending && (
                    <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-200 bg-orange-50">
                      <Flame size={12} className="text-orange-600" /> 
                      Trending
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={selectedPost.authorImage} alt={selectedPost.author} />
                      <AvatarFallback>{selectedPost.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{selectedPost.author}</p>
                      <p className="text-xs text-slate-500">{selectedPost.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {selectedPost.date}
                  </span>
                </div>
              </div>
              
              {/* Featured image */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-md mb-8">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Post content */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n## /g, '<h2>').replace(/\n### /g, '<h3>').replace(/\n/g, '<br>') }}
                >
                </div>
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-slate-50">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Post actions */}
                <div className="mt-8 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-slate-600 hover:text-red-500"
                      onClick={() => handleLike(selectedPost.id)}
                    >
                      <Heart size={16} />
                      <span>{selectedPost.likesCount}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-slate-600"
                    >
                      <MessageSquare size={16} />
                      <span>{selectedPost.commentsCount}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-slate-600"
                      onClick={() => handleBookmark(selectedPost.id)}
                    >
                      <BookmarkPlus size={16} />
                      <span>Save</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-slate-600"
                      onClick={() => handleShare(selectedPost.id)}
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4 space-y-6">
              {/* Author card */}
              <Card className="rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-20 w-20 border-2 border-white">
                      <AvatarImage src={selectedPost.authorImage} alt={selectedPost.author} />
                      <AvatarFallback>{selectedPost.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{selectedPost.author}</h3>
                      <p className="text-sm text-slate-500">{selectedPost.authorRole}</p>
                    </div>
                    <p className="text-sm text-slate-600">
                      Expert in data science with over 10 years of industry experience. Passionate about AI and machine learning.
                    </p>
                    <Button className="w-full" variant="outline">Follow Author</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Related posts */}
              <Card className="rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                    <h3 className="text-lg font-semibold text-slate-800">Related Posts</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {blogPostsData
                      .filter(post => post.id !== selectedPost.id && post.category === selectedPost.category)
                      .slice(0, 3)
                      .map(post => (
                        <div 
                          key={post.id} 
                          className="group cursor-pointer"
                          onClick={() => handleReadPost(post)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular tags */}
              <Card className="rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                    <h3 className="text-lg font-semibold text-slate-800">Popular Tags</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map(tag => (
                        <Badge 
                          key={tag.name} 
                          variant="outline" 
                          className="bg-slate-50 hover:bg-blue-50 cursor-pointer"
                        >
                          #{tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the blog list view
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative overflow-hidden py-12 md:py-24">
        <div className="absolute inset-0 bg-grid-slate-200 opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Our Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Insights & Expertise from Data Professionals
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Stay up-to-date with the latest trends, techniques, and insights in data science, analytics, and machine learning.
            </p>
            
            {/* Search bar */}
            <div className="relative w-full max-w-2xl mt-6">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-12 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-0 shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TabsList className="bg-slate-100 p-1 rounded-full">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                All Posts
              </TabsTrigger>
              <TabsTrigger value="featured" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Featured
              </TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Trending
              </TabsTrigger>
            </TabsList>
          </div>
        
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-3 space-y-6">
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <Tag size={18} className="mr-2 text-blue-500" />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className={`text-xs rounded-full px-2 py-0.5 ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-slate-100">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-slate-500 hover:text-blue-500"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800">Popular Tags</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                          <Badge 
                            key={tag.name} 
                            variant="outline" 
                            className="bg-slate-50 hover:bg-blue-50 cursor-pointer"
                          >
                            #{tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Blog posts */}
              <div className="md:col-span-9">
                {filteredBlogPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredBlogPosts.map(post => (
                      <Card 
                        key={post.id} 
                        className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md cursor-pointer opacity-0 animate-fade-in"
                        onClick={() => handleReadPost(post)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                            />
                            {post.featured && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-blue-500 text-white">Featured</Badge>
                              </div>
                            )}
                            {post.trending && (
                              <div className="absolute top-3 right-3">
                                <Badge variant="outline" className="bg-white flex items-center gap-1">
                                  <Flame size={12} className="text-orange-500" /> 
                                  Trending
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-blue-100 text-blue-700">{post.category}</Badge>
                              <span className="text-xs text-slate-500">{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">
                              {post.title}
                            </h2>
                            <p className="text-slate-600 mb-4 line-clamp-2">
                              {post.summary}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={post.authorImage} alt={post.author} />
                                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-700">{post.author}</span>
                              </div>
                              <span className="text-xs text-slate-500 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {post.date}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-slate-500 flex items-center">
                                  <Heart size={14} className="mr-1 text-red-400" />
                                  {post.likesCount}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center">
                                  <MessageSquare size={14} className="mr-1" />
                                  {post.commentsCount}
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-blue-500 border-blue-200 hover:bg-blue-50"
                              >
                                Read More
                                <ArrowUpRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800">No posts found</h3>
                    <p className="text-slate-500 mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                        setActiveTab('all');
                      }}
                      className="border-blue-200 text-blue-500"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Same sidebar as "all" tab */}
              <div className="md:col-span-3 space-y-6">
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <Tag size={18} className="mr-2 text-blue-500" />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className={`text-xs rounded-full px-2 py-0.5 ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-slate-100">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-slate-500 hover:text-blue-500"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800">Popular Tags</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                          <Badge 
                            key={tag.name} 
                            variant="outline" 
                            className="bg-slate-50 hover:bg-blue-50 cursor-pointer"
                          >
                            #{tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Featured blog posts - same structure as "all" tab but filtered for featured posts */}
              <div className="md:col-span-9">
                {filteredBlogPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredBlogPosts.map(post => (
                      <Card 
                        key={post.id} 
                        className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md cursor-pointer opacity-0 animate-fade-in"
                        onClick={() => handleReadPost(post)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-blue-500 text-white">Featured</Badge>
                            </div>
                            {post.trending && (
                              <div className="absolute top-3 right-3">
                                <Badge variant="outline" className="bg-white flex items-center gap-1">
                                  <Flame size={12} className="text-orange-500" /> 
                                  Trending
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-blue-100 text-blue-700">{post.category}</Badge>
                              <span className="text-xs text-slate-500">{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">
                              {post.title}
                            </h2>
                            <p className="text-slate-600 mb-4 line-clamp-2">
                              {post.summary}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={post.authorImage} alt={post.author} />
                                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-700">{post.author}</span>
                              </div>
                              <span className="text-xs text-slate-500 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {post.date}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-slate-500 flex items-center">
                                  <Heart size={14} className="mr-1 text-red-400" />
                                  {post.likesCount}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center">
                                  <MessageSquare size={14} className="mr-1" />
                                  {post.commentsCount}
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-blue-500 border-blue-200 hover:bg-blue-50"
                              >
                                Read More
                                <ArrowUpRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800">No featured posts found</h3>
                    <p className="text-slate-500 mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                        setActiveTab('all');
                      }}
                      className="border-blue-200 text-blue-500"
                    >
                      See All Posts
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Same sidebar as "all" tab */}
              <div className="md:col-span-3 space-y-6">
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <Tag size={18} className="mr-2 text-blue-500" />
                        Categories
                      </h3>
                    </div>
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-1">
                        {categoriesData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className={`text-xs rounded-full px-2 py-0.5 ${
                              (category.name === "All Posts" && !selectedCategory) || selectedCategory === category.name
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCategory && (
                      <div className="p-3 border-t border-slate-100">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedCategory(null)}
                          className="w-full text-sm text-slate-500 hover:text-blue-500"
                        >
                          Clear Filter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                      <h3 className="text-lg font-semibold text-slate-800">Popular Tags</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                          <Badge 
                            key={tag.name} 
                            variant="outline" 
                            className="bg-slate-50 hover:bg-blue-50 cursor-pointer"
                          >
                            #{tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Trending blog posts - same structure as "all" tab but filtered for trending posts */}
              <div className="md:col-span-9">
                {filteredBlogPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredBlogPosts.map(post => (
                      <Card 
                        key={post.id} 
                        className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md cursor-pointer opacity-0 animate-fade-in"
                        onClick={() => handleReadPost(post)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                            />
                            {post.featured && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-blue-500 text-white">Featured</Badge>
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <Badge variant="outline" className="bg-white flex items-center gap-1">
                                <Flame size={12} className="text-orange-500" /> 
                                Trending
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-blue-100 text-blue-700">{post.category}</Badge>
                              <span className="text-xs text-slate-500">{post.readTime}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">
                              {post.title}
                            </h2>
                            <p className="text-slate-600 mb-4 line-clamp-2">
                              {post.summary}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={post.authorImage} alt={post.author} />
                                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-700">{post.author}</span>
                              </div>
                              <span className="text-xs text-slate-500 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {post.date}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-slate-500 flex items-center">
                                  <Heart size={14} className="mr-1 text-red-400" />
                                  {post.likesCount}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center">
                                  <MessageSquare size={14} className="mr-1" />
                                  {post.commentsCount}
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-blue-500 border-blue-200 hover:bg-blue-50"
                              >
                                Read More
                                <ArrowUpRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800">No trending posts found</h3>
                    <p className="text-slate-500 mt-2 mb-4">Try adjusting your search or filter criteria</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                        setActiveTab('all');
                      }}
                      className="border-blue-200 text-blue-500"
                    >
                      See All Posts
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Blog;
