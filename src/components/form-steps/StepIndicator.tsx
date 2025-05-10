import React from 'react'
import { Check, User, Briefcase, FolderKanban, Award, Palette, GraduationCap } from 'lucide-react'
import { cn } from '../../utils/index'
import { FormStep } from '../../types'
import { usePortfolio } from '../../context/PortfolioContext'

interface StepItem {
  id: FormStep
  label: string
  icon: React.ReactNode
}

export function StepIndicator() {
  const { currentStep, setCurrentStep, progress } = usePortfolio()

  const steps: StepItem[] = [
    {
      id: 'basicInfo',
      label: 'Basic Info',
      icon: <User className="h-5 w-5" />,
    },
    {
      id: 'education',
      label: 'Education',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: 'skillsExp',
      label: 'Skills & Exp',
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: <Award className="h-5 w-5" />,
    },
  ]

  const handleStepClick = (step: FormStep) => {
    setCurrentStep(step)
  }

  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Progress bar background - moved below the step indicators */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />

        {/* Progress bar - moved below the step indicators */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 z-0"
          style={{ width: `${progress}%` }}
        />

        {/* Step indicators - increased z-index */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id
            const isPast = steps.findIndex((s) => s.id === currentStep) > index
            const status = isPast ? 'complete' : isActive ? 'active' : 'inactive'

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={cn('flex flex-col items-center', status === 'inactive' && 'cursor-pointer')}
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 bg-white z-20',
                    status === 'complete' && 'bg-primary border-primary text-white',
                    status === 'active' && 'bg-white border-primary text-primary',
                    status === 'inactive' && 'bg-white border-gray-300 text-gray-400',
                  )}
                >
                  {status === 'complete' ? <Check className="h-6 w-6" /> : step.icon}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs sm:text-sm font-medium whitespace-nowrap',
                    status === 'complete' && 'text-primary',
                    status === 'active' && 'text-primary',
                    status === 'inactive' && 'text-gray-400',
                  )}
                >
                  {step.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
