import React, { useState, useEffect } from 'react'
import { useToast } from '../../components/ui/use-toast'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { makeAPICall } from '../../utils/api'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { enUS } from 'date-fns/locale'
import { isNullOrUndefined } from '../../utils'

registerLocale('en-US', enUS)

export type PortfolioData = {
  personal: {
    name: string
    title: string
    email: string
    phone: string
    linkedin: string
    github: string
    website: string
    location: string
    about: string
  }
  skills: string[]
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string
    link: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
}

const PortfolioForm: React.FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  console.log('user', user)
  const [activeTab, setActiveTab] = useState('personal')
  const [newSkill, setNewSkill] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<PortfolioData>({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      website: '',
      location: '',
      about: '',
    },
    skills: [],
    experience: [
      {
        id: uuidv4(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    projects: [
      {
        id: uuidv4(),
        title: '',
        description: '',
        technologies: '',
        link: '',
      },
    ],
    education: [
      {
        id: uuidv4(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      },
    ],
  })

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolioData = async () => {    
      try {
        setIsLoading(true)
        console.log('Fetching portfolio data for ID:', user.portfolio_id)
        const response = await makeAPICall('getPortfolio', { id: user.portfolio_id }, token as string)
        console.log('API Response:', response)
        
        if (response) {
          console.log('Setting form data:', response)
          // Ensure all required fields are present
          const portfolioData = {
            personal: {
              name: response.personal?.name || '',
              title: response.personal?.title || '',
              email: response.personal?.email || '',
              phone: response.personal?.phone || '',
              linkedin: response.personal?.linkedin || '',
              github: response.personal?.github || '',
              website: response.personal?.website || '',
              location: response.personal?.location || '',
              about: response.personal?.about || '',
            },
            skills: response.skills || [],
            experience: response.experience?.length ? response.experience : [{
              id: uuidv4(),
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
            }],
            projects: response.projects?.length ? response.projects : [{
              id: uuidv4(),
              title: '',
              description: '',
              technologies: '',
              link: '',
            }],
            education: response.education?.length ? response.education : [{
              id: uuidv4(),
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
            }],
          }
          setFormData(portfolioData)
        } else {
          console.log('No data received from API')
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load portfolio data',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (!isNullOrUndefined(user.portfolio_id)) {
      console.log('User portfolio ID exists:', user.portfolio_id)
      fetchPortfolioData()
    } else {
      console.log('No portfolio ID found for user')
    }
  }, [token])

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personal: { ...formData.personal, [name]: value },
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: crypto.randomUUID(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    })
  }

  const handleRemoveExperience = (id: string) => {
    if (formData.experience.length > 1) {
      setFormData({
        ...formData,
        experience: formData.experience.filter((exp) => exp.id !== id),
      })
    } else {
      toast({
        title: 'Cannot Remove',
        description: 'You need at least one experience entry.',
        variant: 'destructive',
      })
    }
  }

  const handleProjectChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          technologies: '',
          link: '',
        },
      ],
    })
  }

  const handleRemoveProject = (id: string) => {
    if (formData.projects.length > 1) {
      setFormData({
        ...formData,
        projects: formData.projects.filter((proj) => proj.id !== id),
      })
    } else {
      toast({
        title: 'Cannot Remove',
        description: 'You need at least one project entry.',
        variant: 'destructive',
      })
    }
  }

  const handleEducationChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: crypto.randomUUID(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        },
      ],
    })
  }

  const handleRemoveEducation = (id: string) => {
    if (formData.education.length > 1) {
      setFormData({
        ...formData,
        education: formData.education.filter((edu) => edu.id !== id),
      })
    } else {
      toast({
        title: 'Cannot Remove',
        description: 'You need at least one education entry.',
        variant: 'destructive',
      })
    }
  }

  const handleDateChange = (id: string, field: string, date: Date | null) => {
    if (!date) return

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })

    if (field.includes('startDate')) {
      handleExperienceChange(id, field, formattedDate)
    } else if (field.includes('endDate')) {
      handleExperienceChange(id, field, formattedDate)
    } else if (field.includes('eduStartDate')) {
      handleEducationChange(id, field.replace('edu', ''), formattedDate)
    } else if (field.includes('eduEndDate')) {
      handleEducationChange(id, field.replace('edu', ''), formattedDate)
    }
  }

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null
    const [month, year] = dateString.split(' ')
    return new Date(`${month} 1, ${year}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.personal.name || !formData.personal.email || !formData.personal.about) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your name, email, and about section.',
        variant: 'destructive',
      })
      setActiveTab('personal')
      return
    }

    if (formData.skills.length === 0) {
      toast({
        title: 'Missing Skills',
        description: 'Please add at least one skill.',
        variant: 'destructive',
      })
      setActiveTab('skills')
      return
    }

    try {
      setIsLoading(true)
      console.log('formData', formData)
      await makeAPICall('savePortfolio', { portfolioData: formData }, token as string)

      toast({
        title: 'Portfolio Saved!',
        description: 'Your portfolio has been successfully saved.',
      })

      // Navigate to the portfolio view
      navigate('/portfolio')
    } catch (error) {
      console.error('Error saving portfolio:', error)
      toast({
        title: 'Error',
        description: 'Failed to save portfolio data',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextTab = () => {
    const tabs = ['personal', 'skills', 'experience', 'projects', 'education']
    const currentIndex = tabs.indexOf(activeTab)

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    } else {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  const handlePreviousTab = () => {
    const tabs = ['personal', 'skills', 'experience', 'projects', 'education']
    const currentIndex = tabs.indexOf(activeTab)

    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 animate-fade-in">
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="gradient-text text-3xl">Portfolio Alchemy Forge</CardTitle>
          <CardDescription>Fill out the form below to generate your professional portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent
                value="personal"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.personal.name}
                      onChange={handlePersonalChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.personal.title}
                      onChange={handlePersonalChange}
                      placeholder="Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.personal.email}
                      onChange={handlePersonalChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={handlePersonalChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.personal.location}
                      onChange={handlePersonalChange}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.personal.linkedin}
                      onChange={handlePersonalChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.personal.github}
                      onChange={handlePersonalChange}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.personal.website}
                      onChange={handlePersonalChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">About Me *</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.personal.about}
                    onChange={handlePersonalChange}
                    placeholder="Write a brief introduction about yourself"
                    rows={4}
                    required
                  />
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent
                value="skills"
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label>Add Skills *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g. React, TypeScript, UI/UX Design"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                    >
                      <Plus
                        size={16}
                        className="mr-1"
                      />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Your Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.length > 0 ? (
                      formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-slate-200 rounded-full px-3 py-1"
                        >
                          <span className="mr-1">{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-500 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills added yet</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent
                value="experience"
                className="space-y-8"
              >
                {formData.experience.map((exp, index) => (
                  <Card
                    key={exp.id}
                    className="portfolio-card"
                  >
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-xl">Experience {index + 1}</CardTitle>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRemoveExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company Name</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                          placeholder="Company Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                          placeholder="Senior Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                        <DatePicker
                          selected={parseDate(exp.startDate)}
                          onChange={(date: Date | null) => handleDateChange(exp.id, 'startDate', date)}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border rounded-md"
                          placeholderText="Select start date"
                          maxDate={new Date()}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                        <DatePicker
                          selected={parseDate(exp.endDate)}
                          onChange={(date: Date | null) => handleDateChange(exp.id, 'endDate', date)}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border rounded-md"
                          placeholderText="Select end date"
                          minDate={parseDate(exp.startDate)}
                          maxDate={new Date()}
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor={`description-${exp.id}`}>Description</Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAddExperience}
                >
                  <Plus
                    size={16}
                    className="mr-1"
                  />
                  Add Another Experience
                </Button>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent
                value="projects"
                className="space-y-8"
              >
                {formData.projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="portfolio-card"
                  >
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-xl">Project {index + 1}</CardTitle>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRemoveProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                        <Input
                          id={`title-${project.id}`}
                          value={project.title}
                          onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                          placeholder="E-commerce Platform"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                        <Input
                          id={`link-${project.id}`}
                          value={project.link}
                          onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                        <Input
                          id={`technologies-${project.id}`}
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor={`description-${project.id}`}>Description</Label>
                        <Textarea
                          id={`description-${project.id}`}
                          value={project.description}
                          onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                          placeholder="Brief description of the project and your role"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAddProject}
                >
                  <Plus
                    size={16}
                    className="mr-1"
                  />
                  Add Another Project
                </Button>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent
                value="education"
                className="space-y-8"
              >
                {formData.education.map((edu, index) => (
                  <Card
                    key={edu.id}
                    className="portfolio-card"
                  >
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-xl">Education {index + 1}</CardTitle>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRemoveEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                          placeholder="University of Technology"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                          placeholder="Bachelor's/Master's/Ph.D."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                        <DatePicker
                          selected={parseDate(edu.startDate)}
                          onChange={(date: Date | null) => handleDateChange(edu.id, 'eduStartDate', date)}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border rounded-md"
                          placeholderText="Select start date"
                          maxDate={new Date()}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <DatePicker
                          selected={parseDate(edu.endDate)}
                          onChange={(date: Date | null) => handleDateChange(edu.id, 'eduEndDate', date)}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border rounded-md"
                          placeholderText="Select end date"
                          minDate={parseDate(edu.startDate)}
                          maxDate={new Date()}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAddEducation}
                >
                  <Plus
                    size={16}
                    className="mr-1"
                  />
                  Add Another Education
                </Button>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousTab}
            disabled={activeTab === 'personal'}
          >
            Previous Step
          </Button>
          <Button
            type="button"
            onClick={handleNextTab}
          >
            {activeTab === 'education' ? 'Generate Portfolio' : 'Next Step'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PortfolioForm
