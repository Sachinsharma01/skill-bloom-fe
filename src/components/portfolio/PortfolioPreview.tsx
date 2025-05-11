import { usePortfolio } from '../../context/PortfolioContext'
import { NavigationButtons } from '../form-steps/NavigationButtons'
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  FileText,
  Download,
  Calendar,
  MapPin,
  School,
  GraduationCap,
  Link,
} from 'lucide-react'
import { toast } from 'sonner'
import { makeAPICall } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import metaDataActions from '../../redux/actions/metaDataActions'

export function PortfolioPreview() {
  const { formData } = usePortfolio()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const { basicInfo, education, skills, experiences, projects, certificates, selectedTemplate } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedCertificates = certificates.filter((cert) => cert.selected)

  // Group skills by category
  const technicalSkills = skills.filter((skill) => skill.category === 'technical')
  const toolSkills = skills.filter((skill) => skill.category === 'tools')
  const additionalSkills = skills.filter((skill) => skill.category === 'additional')

  // Helper function to format date from YYYY-MM to Month Year
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''

    const [year, month] = dateString.split('-')

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return `${months[parseInt(month) - 1]} ${year}`
  }

  const handleGeneratePortfolio = () => {
    setIsLoading(true)
    // In a real implementation, this would trigger portfolio generation
    toast.success('Your portfolio is being generated... 🎉')
    console.log('Portfolio data', formData)

    makeAPICall(
      'savePortfolio',
      {
        formData: formData,
        template: selectedTemplate,
        user_id: user?.id + '',
      },
      token as string,
    ).then((res) => {
      console.log('Portfolio data', res)
      if (res.error || res.errorMessage) {
        toast.error('Error generating portfolio, please try again later')
      } else {
        toast.success('Your portfolio has been generated! 🎉')
        dispatch(metaDataActions.setMetaData({ ...user, has_portfolio_access: true }))
        navigate(`/dashboard/portfolio/${res._id}`)
      }
    })

    return true
  }

  return (
    <div className="form-section space-y-8">
      <h2 className="text-2xl font-bold mb-4">Portfolio Preview</h2>
      <p className="text-muted-foreground">
        This is a preview of how your portfolio will look. When you're ready, click "Generate Portfolio" to create your
        live portfolio website.
      </p>

      <div className="border rounded-lg overflow-hidden shadow-lg">
        {/* Header section */}
        <div
          className={`p-8 ${
            selectedTemplate === 'dark'
              ? 'bg-gray-900 text-white'
              : selectedTemplate === 'original'
              ? 'bg-amber-50'
              : selectedTemplate === 'clean'
              ? 'bg-blue-50'
              : selectedTemplate === 'matrix'
              ? 'bg-gray-100'
              : selectedTemplate === 'starforce'
              ? 'bg-black text-white'
              : 'bg-white'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {basicInfo.photoUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={basicInfo.photoUrl}
                    alt={basicInfo.fullName}
                    className={`w-32 h-32 object-cover ${
                      selectedTemplate === 'original' || selectedTemplate === 'clean' ? 'rounded-full' : 'rounded-lg'
                    } border-4 ${
                      selectedTemplate === 'dark'
                        ? 'border-blue-500'
                        : selectedTemplate === 'original'
                        ? 'border-amber-300'
                        : selectedTemplate === 'clean'
                        ? 'border-white'
                        : selectedTemplate === 'matrix'
                        ? 'border-green-500'
                        : selectedTemplate === 'starforce'
                        ? 'border-yellow-400'
                        : 'border-white'
                    }`}
                  />
                </div>
              )}

              <div className="flex-grow">
                <h1
                  className={`text-3xl md:text-4xl font-bold ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-800'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  {basicInfo.fullName || 'Your Name'}
                </h1>

                <p
                  className={`text-xl mt-1 ${
                    selectedTemplate === 'dark'
                      ? 'text-gray-600'
                      : selectedTemplate === 'starforce'
                      ? 'text-gray-600'
                      : 'text-gray-600'
                  }`}
                >
                  {basicInfo.position || 'Your Position'}
                </p>

                {/* Headline display */}
                {basicInfo.headline && (
                  <p
                    className={`mt-2 text-lg italic ${
                      selectedTemplate === 'dark'
                        ? 'text-gray-300'
                        : selectedTemplate === 'starforce'
                        ? 'text-gray-300'
                        : 'text-gray-700'
                    }`}
                  >
                    "{basicInfo.headline}"
                  </p>
                )}

                {basicInfo.city && (
                  <p
                    className={`mt-1 ${
                      selectedTemplate === 'dark'
                        ? 'text-gray-400'
                        : selectedTemplate === 'starforce'
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {basicInfo.city}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                  {!basicInfo.hideEmail && basicInfo.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{basicInfo.email}</span>
                    </div>
                  )}

                  {!basicInfo.hidePhone && basicInfo.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>+91 {basicInfo.phoneNumber}</span>
                    </div>
                  )}

                  {basicInfo.linkedinProfile && (
                    <a
                      href={basicInfo.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 ${
                        selectedTemplate === 'dark'
                          ? 'text-blue-400 hover:text-blue-300'
                          : selectedTemplate === 'original'
                          ? 'text-blue-700 hover:text-blue-800'
                          : selectedTemplate === 'starforce'
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {basicInfo.githubProfile && (
                    <a
                      href={basicInfo.githubProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 ${
                        selectedTemplate === 'dark'
                          ? 'text-gray-300 hover:text-white'
                          : selectedTemplate === 'starforce'
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {!basicInfo.hideResume && basicInfo.resumeUrl && (
                    <a
                      href={basicInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 ${
                        selectedTemplate === 'dark'
                          ? 'text-green-400 hover:text-green-300'
                          : selectedTemplate === 'original'
                          ? 'text-amber-700 hover:text-amber-800'
                          : selectedTemplate === 'starforce'
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Resume</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* "What do you do?" section with headline */}
            {basicInfo.whatYouDo && (
              <div
                className={`mt-6 ${
                  selectedTemplate === 'dark'
                    ? 'text-gray-300'
                    : selectedTemplate === 'starforce'
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                <h2
                  className={`text-xl font-bold mb-2 ${
                    selectedTemplate === 'dark'
                      ? 'text-white'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  {basicInfo.whatYouDoHeadline || 'What I Do'}
                </h2>
                <p className="whitespace-pre-line">{basicInfo.whatYouDo}</p>
              </div>
            )}

            {/* About section */}
            {basicInfo.aboutYourself && (
              <div
                className={`mt-8 ${
                  selectedTemplate === 'dark'
                    ? 'text-gray-300'
                    : selectedTemplate === 'starforce'
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                <h2
                  className={`text-xl font-bold mb-3 ${
                    selectedTemplate === 'dark'
                      ? 'text-white'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  About Me
                </h2>
                <p className="whitespace-pre-line">{basicInfo.aboutYourself}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div
          className={`p-8 ${
            selectedTemplate === 'dark'
              ? 'bg-gray-800 text-white'
              : selectedTemplate === 'original'
              ? 'bg-white'
              : selectedTemplate === 'clean'
              ? 'bg-white'
              : selectedTemplate === 'matrix'
              ? 'bg-white'
              : selectedTemplate === 'starforce'
              ? 'bg-gray-900 text-white'
              : 'bg-white'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Education section - new section */}
            {education.length > 0 && (
              <section>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  Education
                </h2>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-4 pl-4 border-purple-300"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg">{edu.degree}</h3>
                          <p
                            className={`font-medium ${
                              selectedTemplate === 'dark'
                                ? 'text-blue-300'
                                : selectedTemplate === 'starforce'
                                ? 'text-yellow-300'
                                : 'text-purple-700'
                            }`}
                          >
                            {edu.collegeName}
                          </p>
                        </div>
                        <div
                          className={`text-sm ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-400'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }`}
                        >
                          {edu.startDate && formatDate(edu.startDate)}
                          {edu.startDate && edu.endDate && ' - '}
                          {edu.endDate === 'Present' ? 'Present' : edu.endDate && formatDate(edu.endDate)}
                        </div>
                      </div>

                      <div
                        className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm ${
                          selectedTemplate === 'dark'
                            ? 'text-gray-400'
                            : selectedTemplate === 'starforce'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        {edu.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{edu.location}</span>
                          </div>
                        )}

                        {edu.websiteLink && (
                          <a
                            href={edu.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 ${
                              selectedTemplate === 'dark'
                                ? 'text-blue-400 hover:text-blue-300'
                                : selectedTemplate === 'original'
                                ? 'text-amber-700 hover:text-amber-800'
                                : selectedTemplate === 'starforce'
                                ? 'text-yellow-400 hover:text-yellow-300'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            <Link className="h-3 w-3" />
                            <span>College Website</span>
                          </a>
                        )}
                      </div>

                      {edu.description && (
                        <p
                          className={`mt-3 ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-300'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {edu.description}
                        </p>
                      )}

                      {edu.achievements.length > 0 && (
                        <div className="mt-3">
                          <h4
                            className={`text-sm font-medium ${
                              selectedTemplate === 'dark'
                                ? 'text-gray-200'
                                : selectedTemplate === 'starforce'
                                ? 'text-gray-200'
                                : 'text-gray-900'
                            }`}
                          >
                            Achievements:
                          </h4>
                          <ul
                            className={`list-disc list-inside mt-1 space-y-1 ${
                              selectedTemplate === 'dark'
                                ? 'text-gray-300'
                                : selectedTemplate === 'starforce'
                                ? 'text-gray-300'
                                : 'text-gray-700'
                            }`}
                          >
                            {edu.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-sm"
                              >
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {edu.keySkills.length > 0 && (
                        <div className="mt-3">
                          <h4
                            className={`text-sm font-medium ${
                              selectedTemplate === 'dark'
                                ? 'text-gray-200'
                                : selectedTemplate === 'starforce'
                                ? 'text-gray-200'
                                : 'text-gray-900'
                            }`}
                          >
                            Key Skills:
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {edu.keySkills.map((skill, i) => (
                              <div
                                key={i}
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  selectedTemplate === 'dark'
                                    ? 'bg-gray-700 text-blue-300'
                                    : selectedTemplate === 'original'
                                    ? 'bg-purple-100 text-purple-800'
                                    : selectedTemplate === 'clean'
                                    ? 'bg-blue-100 text-blue-800'
                                    : selectedTemplate === 'matrix'
                                    ? 'bg-gray-100 text-blue-700 border border-blue-300'
                                    : selectedTemplate === 'starforce'
                                    ? 'bg-gray-800 text-yellow-300 border border-yellow-600'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills section - now separated by category */}
            {(technicalSkills.length > 0 || toolSkills.length > 0 || additionalSkills.length > 0) && (
              <section>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  Skills
                </h2>

                {technicalSkills.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        selectedTemplate === 'dark'
                          ? 'text-gray-300'
                          : selectedTemplate === 'starforce'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedTemplate === 'dark'
                              ? 'bg-gray-700 text-blue-300'
                              : selectedTemplate === 'original'
                              ? 'bg-amber-100 text-amber-800'
                              : selectedTemplate === 'clean'
                              ? 'bg-blue-100 text-blue-800'
                              : selectedTemplate === 'matrix'
                              ? 'bg-gray-100 text-green-700 border border-green-300'
                              : selectedTemplate === 'starforce'
                              ? 'bg-gray-800 text-yellow-300 border border-yellow-600'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {toolSkills.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        selectedTemplate === 'dark'
                          ? 'text-gray-300'
                          : selectedTemplate === 'starforce'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Tools & Workflows
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {toolSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedTemplate === 'dark'
                              ? 'bg-gray-700 text-purple-300'
                              : selectedTemplate === 'original'
                              ? 'bg-purple-100 text-purple-800'
                              : selectedTemplate === 'clean'
                              ? 'bg-green-100 text-green-800'
                              : selectedTemplate === 'matrix'
                              ? 'bg-gray-100 text-purple-700 border border-purple-300'
                              : selectedTemplate === 'starforce'
                              ? 'bg-gray-800 text-green-300 border border-green-600'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {additionalSkills.length > 0 && (
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        selectedTemplate === 'dark'
                          ? 'text-gray-300'
                          : selectedTemplate === 'starforce'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Additional Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {additionalSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedTemplate === 'dark'
                              ? 'bg-gray-700 text-green-300'
                              : selectedTemplate === 'original'
                              ? 'bg-green-100 text-green-800'
                              : selectedTemplate === 'clean'
                              ? 'bg-orange-100 text-orange-800'
                              : selectedTemplate === 'matrix'
                              ? 'bg-gray-100 text-blue-700 border border-blue-300'
                              : selectedTemplate === 'starforce'
                              ? 'bg-gray-800 text-blue-300 border border-blue-600'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Experience section */}
            {experiences.length > 0 && (
              <section>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-l-4 pl-4 border-gray-300"
                    >
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <div
                        className={`flex items-center ${
                          selectedTemplate === 'dark'
                            ? 'text-gray-300'
                            : selectedTemplate === 'starforce'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        <span>{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {formatDate(exp.startDate)}
                          {' - '}
                          {exp.isOngoing ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p
                          className={`mt-2 ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-300'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {exp.description}
                        </p>
                      )}
                      {exp.bullets.length > 0 && (
                        <ul
                          className={`list-disc list-outside ml-5 mt-2 space-y-1 ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-300'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects section */}
            {projects.length > 0 && (
              <section>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`border rounded-lg overflow-hidden ${
                        selectedTemplate === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : selectedTemplate === 'original'
                          ? 'bg-white border-amber-200'
                          : selectedTemplate === 'starforce'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              selectedTemplate === 'dark'
                                ? project.status === 'active'
                                  ? 'bg-green-900 text-green-300'
                                  : project.status === 'completed'
                                  ? 'bg-blue-900 text-blue-300'
                                  : 'bg-yellow-900 text-yellow-300'
                                : project.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : project.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                        <p
                          className={`mt-2 ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-300'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {project.description}
                        </p>

                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-0.5 rounded ${
                                  selectedTemplate === 'dark'
                                    ? 'bg-gray-600 text-gray-200'
                                    : selectedTemplate === 'starforce'
                                    ? 'bg-gray-700 text-gray-300'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.link && (
                          <div className="mt-3">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 w-fit ${
                                selectedTemplate === 'dark'
                                  ? 'text-blue-400 hover:text-blue-300'
                                  : selectedTemplate === 'original'
                                  ? 'text-amber-700 hover:text-amber-800'
                                  : selectedTemplate === 'starforce'
                                  ? 'text-yellow-400 hover:text-yellow-300'
                                  : 'text-blue-600 hover:text-blue-700'
                              }`}
                            >
                              <span>View Project</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates section */}
            {selectedCertificates.length > 0 && (
              <section>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    selectedTemplate === 'dark'
                      ? 'text-blue-400'
                      : selectedTemplate === 'original'
                      ? 'text-amber-700'
                      : selectedTemplate === 'matrix'
                      ? 'text-green-700'
                      : selectedTemplate === 'starforce'
                      ? 'text-yellow-400'
                      : ''
                  }`}
                >
                  Certificates & Awards
                </h2>
                <div className="space-y-2">
                  {selectedCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p
                          className={`text-sm ${
                            selectedTemplate === 'dark'
                              ? 'text-gray-400'
                              : selectedTemplate === 'starforce'
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }`}
                        >
                          {cert.issuer}
                          {cert.date && ` • ${cert.date}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 text-center text-sm ${
            selectedTemplate === 'dark'
              ? 'bg-gray-900 text-gray-400'
              : selectedTemplate === 'original'
              ? 'bg-amber-50 text-amber-800'
              : selectedTemplate === 'clean'
              ? 'bg-blue-50 text-blue-800'
              : selectedTemplate === 'matrix'
              ? 'bg-gray-100 text-gray-600'
              : selectedTemplate === 'starforce'
              ? 'bg-black text-gray-400'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Built with PortfolioPal • {new Date().getFullYear()}
        </div>
      </div>

      <NavigationButtons
        onNext={handleGeneratePortfolio}
        showGenerateButton
        isLastStep
        nextLabel="Back to Start"
      />
    </div>
  )
}
