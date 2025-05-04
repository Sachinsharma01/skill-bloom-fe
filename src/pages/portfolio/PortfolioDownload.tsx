import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Code,
  Github,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Download,
  ChevronLeft,
  Award,
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Badge } from '../../components/ui/badge'
import { useToast } from '../../components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import type { PortfolioData } from '../../components/portfolio/PortfolioForm'
import { makeAPICall } from '../../utils/api'
import { useSelector } from 'react-redux'

const Portfolio: React.FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        if (!user?.portfolio_id) {
          toast({
            title: 'No Portfolio Data',
            description: 'Please fill out the form to generate a portfolio.',
            variant: 'destructive',
          })
          navigate('/')
          return
        }

        const response = await makeAPICall('getPortfolio', { id: user.portfolio_id }, token as string)
        console.log('API Response:', response)

        if (response && response.data) {
          setPortfolioData(response.data)
        } else {
          toast({
            title: 'No Portfolio Data',
            description: 'Please fill out the form to generate a portfolio.',
            variant: 'destructive',
          })
          navigate('/')
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load portfolio data. Please try again.',
          variant: 'destructive',
        })
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [navigate, toast, token, user?.portfolio_id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-slow text-xl font-medium text-portfolio-muted">Loading portfolio...</div>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">No Portfolio Data Available</h1>
        <Button onClick={() => navigate('/')}>Create Portfolio</Button>
      </div>
    )
  }

  const { personal, skills, experience, projects, education } = portfolioData

  // Function to print the portfolio (for PDF download)
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-portfolio-background print:bg-white">
      {/* Navigation buttons (only visible on screen, not in print) */}
      <div className="bg-white border-b border-gray-100 shadow-sm print:hidden">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handlePrint}
              className="portfolio-button"
            >
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="container mx-auto max-w-3xl py-8 px-4 print:py-0">
        {/* Hero Section */}
        <section className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-portfolio-secondary mb-2">{personal.name}</h1>
              <h2 className="text-xl text-portfolio-primary mb-3">{personal.title}</h2>
              <p className="text-portfolio-muted mb-4 flex items-center">
                <MapPin
                  size={16}
                  className="mr-2"
                />
                {personal.location}
              </p>
              <p className="text-sm text-portfolio-text mb-4 whitespace-pre-line">{personal.about}</p>
            </div>

            <div className="space-y-3">
              <div className="text-sm">
                <h3 className="text-portfolio-secondary font-semibold mb-2">Contact Information</h3>
                <ul className="space-y-2">
                  {personal.email && (
                    <li>
                      <a
                        href={`mailto:${personal.email}`}
                        className="flex items-center text-portfolio-muted hover:text-portfolio-primary transition-colors"
                      >
                        <Mail
                          size={16}
                          className="mr-2"
                        />
                        <span>{personal.email}</span>
                      </a>
                    </li>
                  )}

                  {personal.phone && (
                    <li>
                      <a
                        href={`tel:${personal.phone}`}
                        className="flex items-center text-portfolio-muted hover:text-portfolio-primary transition-colors"
                      >
                        <Phone
                          size={16}
                          className="mr-2"
                        />
                        <span>{personal.phone}</span>
                      </a>
                    </li>
                  )}

                  {personal.linkedin && (
                    <li>
                      <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-portfolio-muted hover:text-portfolio-primary transition-colors"
                      >
                        <Linkedin
                          size={16}
                          className="mr-2"
                        />
                        <span>LinkedIn</span>
                      </a>
                    </li>
                  )}

                  {personal.github && (
                    <li>
                      <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-portfolio-muted hover:text-portfolio-primary transition-colors"
                      >
                        <Github
                          size={16}
                          className="mr-2"
                        />
                        <span>GitHub</span>
                      </a>
                    </li>
                  )}

                  {personal.website && (
                    <li>
                      <a
                        href={personal.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-portfolio-muted hover:text-portfolio-primary transition-colors"
                      >
                        <ExternalLink
                          size={16}
                          className="mr-2"
                        />
                        <span>Website</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <h2 className="portfolio-section-title flex items-center">
            <Award
              className="mr-2"
              size={20}
            />{' '}
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-slate-50 text-portfolio-text"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <h2 className="portfolio-section-title flex items-center">
            <Briefcase
              className="mr-2"
              size={20}
            />{' '}
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="text-lg font-medium text-portfolio-secondary">{exp.position}</h3>
                  <div className="text-sm text-portfolio-muted flex items-center">
                    <Calendar
                      size={14}
                      className="mr-1"
                    />
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-portfolio-primary font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-portfolio-text whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <h2 className="portfolio-section-title flex items-center">
            <Code
              className="mr-2"
              size={20}
            />{' '}
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-4 border border-gray-100 h-full flex flex-col"
              >
                <h3 className="text-base font-medium text-portfolio-secondary mb-1">{project.title}</h3>
                <div className="text-xs text-portfolio-primary mb-2">{project.technologies}</div>
                <p className="text-sm mb-3 text-portfolio-text flex-grow">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs portfolio-link flex items-center mt-auto"
                  >
                    <ExternalLink
                      size={14}
                      className="mr-1"
                    />
                    View Project
                  </a>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <h2 className="portfolio-section-title flex items-center">
            <GraduationCap
              className="mr-2"
              size={20}
            />{' '}
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="text-base font-medium text-portfolio-secondary">{edu.institution}</h3>
                  <div className="text-sm text-portfolio-muted">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <p className="text-portfolio-primary text-sm">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ''}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-portfolio-muted print:hidden mb-8">
          <p>Generated with Portfolio Creator</p>
          <p className="mt-1">{new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  )
}

export default Portfolio
