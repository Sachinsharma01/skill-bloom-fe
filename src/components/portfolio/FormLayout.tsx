
import React from 'react';
import { StepIndicator } from '../form-steps/StepIndicator';
import { BasicInfoForm } from '../form-steps/BasicInfoForm';
import { EducationForm } from '../form-steps/EducationForm';
import { SkillsExpForm } from '../form-steps/SkillsExpForm';
import { ProjectsForm } from '../form-steps/ProjectsForm';
import { CertificatesForm } from '../form-steps/CertificatesForm';
import { TemplateForm } from '../form-steps/TemplateForm';
import { PortfolioPreview } from './PortfolioPreview';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIsMobile } from '../../hooks/use-mobile';

export function FormLayout() {
  const { currentStep } = usePortfolio();
  const isMobile = useIsMobile();

  return (
    <div className="relative px-4 sm:px-6">
      <div className="form-container relative">
        {currentStep !== 'preview' && (
          <div className={`${isMobile ? 'mb-6' : 'mb-10'}`}>
            <StepIndicator />
          </div>
        )}
        
        <div className="transition-all duration-500 ease-out">
          {currentStep === 'basicInfo' && <BasicInfoForm />}
          {currentStep === 'education' && <EducationForm />}
          {currentStep === 'skillsExp' && <SkillsExpForm />}
          {currentStep === 'projects' && <ProjectsForm />}
          {currentStep === 'certificates' && <CertificatesForm />}
          {currentStep === 'template' && <TemplateForm />}
          {currentStep === 'preview' && <PortfolioPreview />}
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />
          <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-blue-100 to-sky-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000" />
        </div>
      </div>

      {/* Background decorative gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white/0 via-white/60 to-white/0 rounded-3xl blur-3xl opacity-50 transform -skew-y-6" />
    </div>
  );
}
