
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { NavigationButtons } from './NavigationButtons';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion';
import { Textarea } from '../../components/ui/textarea';
import { Education } from '../../types';
import { School, GraduationCap, Calendar, MapPin, CheckCircle, XCircle, Link, Plus, Minus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '../../components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../../components/ui/dialog';
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "../../components/ui/alert";

export function EducationForm({ educationData }: { educationData: any}) {
  const { formData, addEducation, updateEducation, removeEducation, goToNextStep, goToPrevStep } = usePortfolio();
  useEffect(() => {
    if (educationData) {
      educationData.forEach((education: any) => {
        addEducation(education);
      });
    }
  }, [educationData]);
  const { education } = formData;
  console.log("education", education)

  const [isAdding, setIsAdding] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isPresentEndDate, setIsPresentEndDate] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // New education state
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    collegeName: '',
    degree: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: [],
    keySkills: [],
    websiteLink: ''
  });
  
  // Achievement input state
  const [achievement, setAchievement] = useState('');
  
  // Key skill input state
  const [keySkill, setKeySkill] = useState('');

  const handleAddAchievement = () => {
    if (!achievement.trim()) return;
    
    if (editingEducation) {
      setEditingEducation({
        ...editingEducation,
        achievements: [...editingEducation.achievements, achievement]
      });
    } else {
      setNewEducation({
        ...newEducation,
        achievements: [...newEducation.achievements, achievement]
      });
    }
    setAchievement('');
  };

  const handleRemoveAchievement = (index: number) => {
    if (editingEducation) {
      const updatedAchievements = [...editingEducation.achievements];
      updatedAchievements.splice(index, 1);
      setEditingEducation({
        ...editingEducation,
        achievements: updatedAchievements
      });
    } else {
      const updatedAchievements = [...newEducation.achievements];
      updatedAchievements.splice(index, 1);
      setNewEducation({
        ...newEducation,
        achievements: updatedAchievements
      });
    }
  };

  const handleAddKeySkill = () => {
    if (!keySkill.trim()) return;
    
    if (editingEducation) {
      setEditingEducation({
        ...editingEducation,
        keySkills: [...editingEducation.keySkills, keySkill]
      });
    } else {
      setNewEducation({
        ...newEducation,
        keySkills: [...newEducation.keySkills, keySkill]
      });
    }
    setKeySkill('');
  };

  const handleRemoveKeySkill = (index: number) => {
    if (editingEducation) {
      const updatedKeySkills = [...editingEducation.keySkills];
      updatedKeySkills.splice(index, 1);
      setEditingEducation({
        ...editingEducation,
        keySkills: updatedKeySkills
      });
    } else {
      const updatedKeySkills = [...newEducation.keySkills];
      updatedKeySkills.splice(index, 1);
      setNewEducation({
        ...newEducation,
        keySkills: updatedKeySkills
      });
    }
  };

  const validateEducation = (edu: Omit<Education, 'id'>) => {
    const errors = [];

    if (!edu.collegeName.trim()) errors.push('College name is required');
    if (!edu.degree.trim()) errors.push('Degree is required');
    if (!edu.location.trim()) errors.push('Location is required');
    if (!edu.startDate) errors.push('Start date is required');
    if (!isPresentEndDate && !edu.endDate) errors.push('End date is required unless currently studying');
    
    return errors;
  };

  const handleSaveEducation = () => {
    const errors = validateEducation(editingEducation || newEducation);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationDialog(true);
      return;
    }

    // Set endDate to "Present" if checkbox is checked
    const endDate = isPresentEndDate ? "Present" : editingEducation?.endDate || newEducation.endDate;

    if (editingEducation) {
      updateEducation({
        ...editingEducation,
        endDate: endDate
      });
      setEditingEducation(null);
      toast.success('Education updated successfully');
    } else {
      addEducation({
        ...newEducation,
        endDate: endDate
      });
      toast.success('Education added successfully');
      setNewEducation({
        collegeName: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: [],
        keySkills: [],
        websiteLink: ''
      });
    }
    setIsAdding(false);
    setIsPresentEndDate(false);
  };

  const handleStartEdit = (edu: Education) => {
    setEditingEducation(edu);
    setIsPresentEndDate(edu.endDate === "Present");
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingEducation(null);
    setIsPresentEndDate(false);
    setNewEducation({
      collegeName: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [],
      keySkills: [],
      websiteLink: ''
    });
  };

  const handleNext = () => {
    // Check if there's at least one education entry
    if (education.length === 0) {
      setValidationErrors(['Please add at least one education entry before proceeding']);
      setShowValidationDialog(true);
      return false;
    }
    
    return true;
  };

  const togglePresentEndDate = () => {
    setIsPresentEndDate(!isPresentEndDate);
  };

  return (
    <div className="form-section space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Education</h2>
        {!isAdding && (
          <Button 
            variant="outline" 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        )}
      </div>

      {education.length === 0 && !isAdding && (
        <div className="p-8 text-center border border-dashed rounded-lg bg-muted/30">
          <School className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium text-lg mb-1">No education added yet</h3>
          <p className="text-muted-foreground">Add your education details to showcase your academic background</p>
        </div>
      )}

      {isAdding ? (
        <div className="space-y-5 p-5 border rounded-lg bg-card animate-in slide-in-from-top-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="flex items-center gap-2">
                <School className="h-4 w-4" />
                College/University Name*
              </Label>
              <Input
                id="collegeName"
                placeholder="Enter college name"
                value={editingEducation?.collegeName || newEducation.collegeName}
                onChange={(e) => editingEducation 
                  ? setEditingEducation({...editingEducation, collegeName: e.target.value})
                  : setNewEducation({...newEducation, collegeName: e.target.value})
                }
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="degree" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Degree*
              </Label>
              <Input
                id="degree"
                placeholder="Enter degree"
                value={editingEducation?.degree || newEducation.degree}
                onChange={(e) => editingEducation 
                  ? setEditingEducation({...editingEducation, degree: e.target.value})
                  : setNewEducation({...newEducation, degree: e.target.value})
                }
                required
              />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location*
              </Label>
              <Input
                id="location"
                placeholder="e.g., New York, NY"
                value={editingEducation?.location || newEducation.location}
                onChange={(e) => editingEducation 
                  ? setEditingEducation({...editingEducation, location: e.target.value})
                  : setNewEducation({...newEducation, location: e.target.value})
                }
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date* (Month/Year)
              </Label>
              <Input
                id="startDate"
                type="month"
                placeholder="Select start date"
                value={editingEducation?.startDate || newEducation.startDate}
                onChange={(e) => editingEducation 
                  ? setEditingEducation({...editingEducation, startDate: e.target.value})
                  : setNewEducation({...newEducation, startDate: e.target.value})
                }
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                End Date* (Month/Year)
              </Label>
              <div className="space-y-2">
                {!isPresentEndDate && (
                  <Input
                    id="endDate"
                    type="month"
                    placeholder="Select end date"
                    value={editingEducation?.endDate === "Present" ? "" : (editingEducation?.endDate || newEducation.endDate)}
                    onChange={(e) => editingEducation 
                      ? setEditingEducation({...editingEducation, endDate: e.target.value})
                      : setNewEducation({...newEducation, endDate: e.target.value})
                    }
                    disabled={isPresentEndDate}
                    required={!isPresentEndDate}
                  />
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="currentlyStudying"
                    checked={isPresentEndDate}
                    onCheckedChange={togglePresentEndDate}
                  />
                  <label htmlFor="currentlyStudying" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Currently studying
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteLink" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              College Website Link
            </Label>
            <Input
              id="websiteLink"
              placeholder="https://www.collegename.edu"
              value={editingEducation?.websiteLink || newEducation.websiteLink || ''}
              onChange={(e) => editingEducation 
                ? setEditingEducation({...editingEducation, websiteLink: e.target.value})
                : setNewEducation({...newEducation, websiteLink: e.target.value})
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Briefly describe your education experience"
              value={editingEducation?.description || newEducation.description || ''}
              onChange={(e) => editingEducation 
                ? setEditingEducation({...editingEducation, description: e.target.value})
                : setNewEducation({...newEducation, description: e.target.value})
              }
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              Achievements
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter an achievement"
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <Button type="button" onClick={handleAddAchievement}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {(editingEducation ? editingEducation.achievements : newEducation.achievements).map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    className="ml-1 text-purple-800 hover:text-purple-900"
                    onClick={() => handleRemoveAchievement(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              Key Skills
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter a key skill"
                value={keySkill}
                onChange={(e) => setKeySkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddKeySkill();
                  }
                }}
              />
              <Button type="button" onClick={handleAddKeySkill}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {(editingEducation ? editingEducation.keySkills : newEducation.keySkills).map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    className="ml-1 text-blue-800 hover:text-blue-900"
                    onClick={() => handleRemoveKeySkill(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSaveEducation}>
              {editingEducation ? 'Update' : 'Add'} Education
            </Button>
          </div>
        </div>
      ) : (
        education.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            {education.map((edu, index) => (
              <AccordionItem key={edu.id} value={`item-${index}`} className="border rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.collegeName}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm text-muted-foreground">
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {edu.startDate && formatDate(edu.startDate)}
                            {edu.startDate && edu.endDate && ' - '}
                            {edu.endDate === "Present" ? "Present" : (edu.endDate && formatDate(edu.endDate))}
                          </span>
                        </div>
                      )}
                      {edu.websiteLink && (
                        <div className="flex items-center gap-1">
                          <Link className="h-3 w-3" />
                          <a 
                            href={edu.websiteLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit website
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {edu.description && (
                      <div className="mt-2 text-sm">
                        <p>{edu.description}</p>
                      </div>
                    )}
                    
                    {edu.achievements.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                          Achievements
                        </h4>
                        <ul className="list-disc list-inside text-sm pl-1 space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {edu.keySkills.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.keySkills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Minus className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleStartEdit(edu)}
                      >
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )
      )}

      {/* Validation Dialog */}
      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Required Fields Missing
            </DialogTitle>
            <DialogDescription>
              Please complete the following required fields:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <Alert variant="destructive" className="bg-red-50">
              <AlertTitle>The following fields are required:</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowValidationDialog(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <NavigationButtons onNext={handleNext} />
    </div>
  );
}

// Helper function to format date from YYYY-MM to Month Year
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${months[parseInt(month) - 1]} ${year}`;
}
