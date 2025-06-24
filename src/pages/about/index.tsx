import React, { useEffect, useState } from 'react'
import { Award, Target, BookOpen, Globe, Lightbulb } from 'lucide-react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Link } from 'react-router-dom'
import publicApi from '../../utils/publicApi'

// Team member type
type TeamMember = {
  name: string
  role: string
  bio: string
  imageUrl: string
}

// Values type
type CoreValue = {
  title: string
  description: string
  icon: React.ReactNode
}

const About = () => {
  window.scrollTo({ top: 0, left: 0 })
  const [stats, setStats] = useState<any>(null)
  // Team members data
  const teamMembers: TeamMember[] = [
    /* {
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
    }*/
  ]

  useEffect(() => {
    publicApi.getStats().then((res: any) => {
      console.log(res)
      res.json().then((data: any) => {
        console.log(data)
        setStats(data.data)
      })
    })
  }, [])
  // Core values
  const coreValues: CoreValue[] = [
    {
      title: 'Quality First',
      description:
        'We don’t compromise. Every resource is designed with precision, ensuring high standards and real impact.',
      icon: <Award className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: 'User Experience',
      description:
        'From design to delivery, we focus on creating a smooth, intuitive, and enjoyable journey for every user.',
      icon: <Lightbulb className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: 'Purpose Driven',
      description:
        'Everything we offer is created with intent — to solve real challenges and bring measurable career growth.',
      icon: <Target className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: 'Inclusive Access',
      description:
        "No matter who you are or where you're from, SkillBoom is built to support your growth — with tools that are clear, useful, and open to all.",
      icon: <Globe className="h-10 w-10 text-brand-teal" />,
    },
  ]

  // Company milestones
  const milestones = [
    {
      year: 2024,
      event:
        'SkillBoom was founded with a mission to make personal branding simple, fast, and accessible for everyone.',
    },
    {
      year: 2025,
      event:
        'Launched our first platform with instant portfolio creation and premium career resources for job seekers and professionals.',
    },
    /*{ year: 2020, event: "Expanded to 50+ courses and introduced our adaptive learning technology" },
    { year: 2021, event: "Reached 100,000 students across 30 countries" },
    { year: 2022, event: "Established partnerships with 25 leading universities and organizations" },
    { year: 2023, event: "Introduced personalized learning paths and AI-driven content recommendations" }*/
  ]

  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Unlock Your Potential with SkillBoom</h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                At SkillBoom, we're redefining how individuals prepare for the professional world.
                <br />
                We are here to make personal branding and career growth effortless.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  asChild
                  className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold w-full sm:w-auto"
                >
                  <Link to="/resources">Explore Our Resources</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-brand-teal text-white hover:bg-white/10"
                >
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
                    <b>Where Skills Spark the Future</b>
                  </p>
                  <p className="mb-4">
                    In a world where standing out is just as important as showing up, SkillBoom was created to bridge
                    the gap between talent and opportunity.
                  </p>
                  <p className="mb-4">
                    We realized that while people are constantly learning and growing, what they often lack is the right
                    way to present their skills — to be seen, to be remembered, and to be chosen. That’s where we come
                    in.
                  </p>
                  <p>
                    SkillBoom isn’t just a platform — it’s a mindset shift. We’re here to simplify personal branding and
                    professional growth with intuitive tools designed for today’s learners, jobseekers, and career
                    switchers.
                  </p>{' '}
                  <br />
                  <p className="mb-4">
                    From day one, our goal has been clear:
                    <ul className="list-disc ml-10 space-y-1">
                      <li className="pl-1">
                        Empower individuals to showcase their skills confidently and take control of their career
                        journey.
                      </li>
                    </ul>
                  </p>
                  <p className="mb-4">And this is just the beginning.</p>
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
                    To empower every individual to confidently present their skills, build a powerful personal brand,
                    and unlock better opportunities — through accessible, smart, and modern digital platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-brand-blue-light"></div>
                <CardContent className="pt-8">
                  <Target className="h-12 w-12 text-brand-blue-light mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To become the go-to platform where skills meet visibility — enabling everyone to own their
                    narrative, showcase their talent, and shape the future they envision.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-10 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold mb-4">Our Core Values</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-90">
                At SkillBoom, every click, resource, and detail is guided by these four values — built to elevate your
                journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 md:py-24"> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        {/*<div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-4">Meet Our Team</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Passionate educators, technologists, and visionaries committed to transforming how the world learns.
              </p>
            </div>*/}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            </div> */}
        {/*<div className="text-center mt-12">
              <Button asChild variant="outline" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10">
                <Link to="/team">View Full Team</Link>
              </Button>
            </div>*/}
        {/* </div> */}
        {/* </section> */}

        {/* Milestones Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-12 text-center">Our Journey</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-edtech-common-light"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Year bubble */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-edtech-common flex items-center justify-center text-white font-bold z-10">
                      {milestone.year}
                    </div>

                    {/* Content box */}
                    <div
                      className={`w-5/12 p-6 rounded-lg shadow-md ${
                        index % 2 === 0 ? 'text-right mr-8' : 'text-left ml-8'
                      }`}
                    >
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">{stats?.active_users ?? 0}</div>
                <div className="text-white/80">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats?.total_portfolios ?? 0}</div>
                <div className="text-white/80">Published Portfolios</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats?.total_resources ?? 0}</div>
                <div className="text-white/80">Unique Resources</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats?.total_countries ?? 0}</div>
                <div className="text-white/80">Countries Reached</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-blue-dark mb-6">Join Us in Transforming Careers</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you're a student, job seeker, or just passionate about building your future — there's a space for
              you at SkillBoom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                className="bg-edtech-common hover:bg-edtech-common/90 text-white"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
              {/* <Button asChild variant="outline" className="border-edtech-dark text-edtech-dark hover:bg-edtech-dark/10">
                <Link to="/teach">Become an Instructor</Link>
              </Button> */}
              <Button
                asChild
                variant="outline"
                className="border-edtech-common text-edtech-common hover:bg-edtech-common/10"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default About
