import React, { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Switch } from '../../components/ui/switch'
import { Button } from '../../components/ui/button'
import { FileInput } from '../../components/ui/file-input'
import { toast } from 'sonner'
import { NavigationButtons } from './NavigationButtons'
import { documentUpload } from '../../utils/storage'
import { BUCKET_NAMES } from '../../utils/constants'

export function BasicInfoForm() {
  const { formData, updateBasicInfo } = usePortfolio()
  const { basicInfo } = formData

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      toast.loading('Uploading photo...')
      documentUpload(file, BUCKET_NAMES.PORTFOLIO).then((res) => {
        if (res.error) {
          toast.dismiss()
          toast.error(res.message)
        } else {
          const photoUrl = res.url
          updateBasicInfo({ photo: file, photoUrl })
          toast.dismiss()
          toast.success('Photo uploaded successfully')
        }
      })
    } else {
      updateBasicInfo({ photo: null, photoUrl: '' })
    }
  }

  const handleResumeChange = (file: File | null) => {
    if (file) {
      toast.loading('Uploading resume...')
      documentUpload(file, BUCKET_NAMES.RESUME).then((res) => {
        if (res.error) {
          toast.dismiss()
          toast.error(res.message)
        } else {
          const resumeUrl = res.url
          updateBasicInfo({ resume: file, resumeUrl })
          toast.dismiss()
          toast.success('Resume uploaded successfully')
        }
      })
    } else {
      updateBasicInfo({ resume: null, resumeUrl: '' })
    }
  }

  const validateForm = () => {
    const requiredFields = [
      { field: 'fullName', label: 'Full Name' },
      { field: 'email', label: 'Email' },
      { field: 'position', label: 'Position' },
    ] as const

    for (const { field, label } of requiredFields) {
      if (!basicInfo[field]) {
        toast.error(`${label} is required`)
        return false
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (basicInfo.email && !emailRegex.test(basicInfo.email)) {
      toast.error('Please enter a valid email address')
      return false
    }

    return true
  }

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <Label
              htmlFor="fullName"
              className="input-label"
            >
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={basicInfo.fullName}
              onChange={(e) => updateBasicInfo({ fullName: e.target.value })}
            />
          </div>

          <div className="input-group">
            <Label
              htmlFor="position"
              className="input-label"
            >
              Position * <span className="text-xs text-muted-foreground">(Max 25 characters)</span>
            </Label>
            <Input
              id="position"
              placeholder="Data Analyst"
              value={basicInfo.position}
              onChange={(e) => {
                if (e.target.value.length <= 25) {
                  updateBasicInfo({ position: e.target.value })
                }
              }}
              maxLength={25}
            />
          </div>
        </div>

        {/* "What do you do?" section with headline */}
        <div className="space-y-3">
          <div className="input-group">
            <Label
              htmlFor="whatYouDoHeadline"
              className="input-label"
            >
              What Do You Do - Headline{' '}
              <span className="text-xs text-muted-foreground">
                (A catchy title for this section, Max 50 characters)
              </span>
            </Label>
            <Input
              id="whatYouDoHeadline"
              placeholder="Turning Complex Data into Actionable Insights"
              value={basicInfo.whatYouDoHeadline || ''}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  updateBasicInfo({ whatYouDoHeadline: e.target.value })
                }
              }}
              maxLength={50}
            />
            <div className="text-xs text-right mt-1 text-muted-foreground">
              {basicInfo.whatYouDoHeadline?.length || 0}/50 characters
            </div>
          </div>

          <div className="input-group">
            <Label
              htmlFor="whatYouDo"
              className="input-label"
            >
              What do you do?{' '}
              <span className="text-xs text-muted-foreground">(Describe your main skills & focus areas)</span>
            </Label>
            <Textarea
              id="whatYouDo"
              placeholder="I specialize in data visualization and statistical analysis..."
              value={basicInfo.whatYouDo || ''}
              onChange={(e) => updateBasicInfo({ whatYouDo: e.target.value })}
              className="min-h-[100px]"
              maxLength={300}
            />
            <div className="text-xs text-right mt-1 text-muted-foreground">
              {basicInfo.whatYouDo?.length || 0}/300 characters
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <Label
              htmlFor="email"
              className="input-label"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={basicInfo.email}
              onChange={(e) => updateBasicInfo({ email: e.target.value })}
            />
            <div className="flex items-center mt-2">
              <Switch
                id="hideEmail"
                checked={basicInfo.hideEmail}
                onCheckedChange={(checked) => updateBasicInfo({ hideEmail: checked })}
              />
              <Label
                htmlFor="hideEmail"
                className="ml-2 text-sm"
              >
                I prefer to hide my Email from the portfolio website.
              </Label>
            </div>
          </div>

          <div className="input-group">
            <Label
              htmlFor="phoneNumber"
              className="input-label"
            >
              Phone Number
            </Label>
            <div className="flex">
              <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md">+91</span>
              <Input
                id="phoneNumber"
                placeholder="9876543210"
                value={basicInfo.phoneNumber}
                className="rounded-l-none"
                onChange={(e) => updateBasicInfo({ phoneNumber: e.target.value })}
              />
            </div>
            <div className="flex items-center mt-2">
              <Switch
                id="hidePhone"
                checked={basicInfo.hidePhone}
                onCheckedChange={(checked) => updateBasicInfo({ hidePhone: checked })}
              />
              <Label
                htmlFor="hidePhone"
                className="ml-2 text-sm"
              >
                I prefer to hide my Phone Number from the portfolio website.
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <Label
              htmlFor="city"
              className="input-label"
            >
              City
            </Label>
            <Input
              id="city"
              placeholder="New York"
              value={basicInfo.city}
              onChange={(e) => updateBasicInfo({ city: e.target.value })}
            />
          </div>

          <div className="input-group">
            <Label
              htmlFor="introVideoLink"
              className="input-label"
            >
              Intro Video Link <span className="text-xs text-muted-foreground">(Show tutorial)</span>
            </Label>
            <Input
              id="introVideoLink"
              placeholder="https://youtube.com/watch?v=..."
              value={basicInfo.introVideoLink}
              onChange={(e) => updateBasicInfo({ introVideoLink: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <Label
              htmlFor="linkedinProfile"
              className="input-label"
            >
              LinkedIn Profile{' '}
              <span className="text-xs text-muted-foreground">(https://www.linkedin.com/in/user-id/)</span>
            </Label>
            <Input
              id="linkedinProfile"
              placeholder="https://www.linkedin.com/in/johndoe/"
              value={basicInfo.linkedinProfile}
              onChange={(e) => updateBasicInfo({ linkedinProfile: e.target.value })}
            />
          </div>

          <div className="input-group">
            <Label
              htmlFor="githubProfile"
              className="input-label"
            >
              GitHub Profile
            </Label>
            <Input
              id="githubProfile"
              placeholder="https://github.com/johndoe"
              value={basicInfo.githubProfile}
              onChange={(e) => updateBasicInfo({ githubProfile: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <Label
              htmlFor="photo"
              className="input-label"
            >
              Upload Your Photo <span className="text-xs text-muted-foreground">(Only JPG, PNG, Max 5MB)</span>
            </Label>
            <FileInput
              id="photo"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              maxSizeMB={5}
              buttonText="Choose Photo"
            />
            {basicInfo.photoUrl && (
              <div className="mt-2">
                <img
                  src={basicInfo.photoUrl}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <Label
              htmlFor="resume"
              className="input-label"
            >
              Upload Your Resume <span className="text-xs text-muted-foreground">(Only PDF, Max 5MB)</span>
            </Label>
            <FileInput
              id="resume"
              accept="application/pdf"
              onChange={handleResumeChange}
              maxSizeMB={5}
              buttonText="Choose Resume"
            />
            <div className="flex items-center mt-2">
              <Switch
                id="hideResume"
                checked={basicInfo.hideResume}
                onCheckedChange={(checked) => updateBasicInfo({ hideResume: checked })}
              />
              <Label
                htmlFor="hideResume"
                className="ml-2 text-sm"
              >
                I prefer to hide my Resume from the portfolio website.
              </Label>
            </div>
          </div>
        </div>

        <div className="input-group">
          <Label
            htmlFor="headline"
            className="input-label"
          >
            Headline{' '}
            <span className="text-xs text-muted-foreground">
              (A catchy one-liner about yourself, Max 80 characters)
            </span>
          </Label>
          <Input
            id="headline"
            placeholder="Turning data into meaningful insights and actionable strategies"
            value={basicInfo.headline || ''}
            onChange={(e) => {
              if (e.target.value.length <= 80) {
                updateBasicInfo({ headline: e.target.value })
              }
            }}
            maxLength={80}
          />
          <div className="text-xs text-right mt-1 text-muted-foreground">
            {basicInfo.headline?.length || 0}/80 characters
          </div>
        </div>

        <div className="input-group">
          <Label
            htmlFor="aboutYourself"
            className="input-label"
          >
            About Yourself <span className="text-xs text-muted-foreground">(Max 1000 characters, Show tutorial)</span>
          </Label>
          <Textarea
            id="aboutYourself"
            placeholder="Tell us about yourself, your skills, experience, and passion..."
            value={basicInfo.aboutYourself}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                updateBasicInfo({ aboutYourself: e.target.value })
              }
            }}
            className="min-h-[150px]"
            maxLength={1000}
          />
          <div className="text-xs text-right mt-1 text-muted-foreground">
            {basicInfo.aboutYourself.length}/1000 characters
          </div>
        </div>

        <div className="input-group">
          <Label className="input-label">Advanced Privacy Setting</Label>
          <div className="flex items-center mt-2">
            <Switch
              id="hideFromSearch"
              checked={basicInfo.hideFromSearch}
              onCheckedChange={(checked) => updateBasicInfo({ hideFromSearch: checked })}
            />
            <Label
              htmlFor="hideFromSearch"
              className="ml-2"
            >
              I prefer to hide my portfolio from Google search results.
            </Label>
          </div>
        </div>
      </div>

      <NavigationButtons onNext={validateForm} />
    </div>
  )
}
