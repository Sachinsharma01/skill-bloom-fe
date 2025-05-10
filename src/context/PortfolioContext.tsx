import React, { createContext, useState, useContext, ReactNode } from 'react'
import { nanoid } from 'nanoid'
import {
  BasicInfo,
  Skill,
  Experience,
  Project,
  Certificate,
  Education,
  PortfolioFormData,
  FormStep,
  TemplateType,
} from '../types'
import { DEFAULT_CERTIFICATES } from '../utils/constants'

interface PortfolioContextType {
  currentStep: FormStep
  formData: PortfolioFormData
  progress: number
  setCurrentStep: (step: FormStep) => void
  goToNextStep: () => void
  goToPrevStep: () => void
  updateBasicInfo: (data: Partial<BasicInfo>) => void
  addEducation: (education: Omit<Education, 'id'>) => void
  updateEducation: (education: Education) => void
  removeEducation: (id: string) => void
  addSkill: (name: string, category: 'technical' | 'tools' | 'additional', proficiency?: number) => void
  updateSkill: (id: string, updates: Partial<Omit<Skill, 'id'>>) => void
  removeSkill: (id: string) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (experience: Experience) => void
  removeExperience: (id: string) => void
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (project: Project) => void
  removeProject: (id: string) => void
  updateCertificate: (id: string, selected: boolean) => void
  addCertificate: (certificate: Omit<Certificate, 'id' | 'selected'>) => void
  removeCertificate: (id: string) => void
  setSelectedTemplate: (template: TemplateType) => void
}

const defaultBasicInfo: BasicInfo = {
  fullName: '',
  email: '',
  phoneNumber: '',
  city: '',
  position: '',
  linkedinProfile: '',
  githubProfile: '',
  introVideoLink: '',
  photo: null,
  photoUrl: '',
  aboutYourself: '',
  resume: null,
  resumeUrl: '',
  hideEmail: false,
  hidePhone: false,
  hideResume: false,
  hideFromSearch: false,
  whatYouDo: '',
  headline: '',
  whatYouDoHeadline: '',
}

const initialFormData: PortfolioFormData = {
  basicInfo: defaultBasicInfo,
  education: [],
  skills: [],
  experiences: [],
  projects: [],
  certificates: DEFAULT_CERTIFICATES,
  selectedTemplate: 'original',
}

// Define the order of steps with education after basicInfo
const steps: FormStep[] = ['basicInfo', 'education', 'skillsExp', 'projects', 'certificates', 'preview']

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<PortfolioFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState<FormStep>('basicInfo')

  const currentStepIndex = steps.findIndex((step) => step === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const updateBasicInfo = (data: Partial<BasicInfo>) => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        ...data,
      },
    }))
  }

  // Education functions
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...education,
      id: nanoid(),
    }

    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const updateEducation = (education: Education) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === education.id ? education : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  // Updated to include proficiency as a number for technical skills
  const addSkill = (name: string, category: 'technical' | 'tools' | 'additional', proficiency?: number) => {
    const newSkill: Skill = {
      id: nanoid(),
      name,
      category,
      ...(proficiency !== undefined && { proficiency }),
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  // New function to update skills (for proficiency updates)
  const updateSkill = (id: string, updates: Partial<Omit<Skill, 'id'>>) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: nanoid(),
    }

    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
  }

  const updateExperience = (experience: Experience) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === experience.id ? experience : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: nanoid(),
    }

    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (project: Project) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }))
  }

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  const updateCertificate = (id: string, selected: boolean) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert) => (cert.id === id ? { ...cert, selected } : cert)),
    }))
  }

  const addCertificate = (certificate: Omit<Certificate, 'id' | 'selected'>) => {
    const newCertificate: Certificate = {
      ...certificate,
      id: nanoid(),
      selected: true,
    }

    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCertificate],
    }))
  }

  const removeCertificate = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((cert) => cert.id !== id),
    }))
  }

  const setSelectedTemplate = (template: TemplateType) => {
    setFormData((prev) => ({
      ...prev,
      selectedTemplate: template,
    }))
  }

  const value = {
    currentStep,
    formData,
    progress,
    setCurrentStep,
    goToNextStep,
    goToPrevStep,
    updateBasicInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    updateCertificate,
    addCertificate,
    removeCertificate,
    setSelectedTemplate,
  }

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
