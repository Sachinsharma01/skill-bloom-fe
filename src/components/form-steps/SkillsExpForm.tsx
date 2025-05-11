import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { NavigationButtons } from './NavigationButtons';
import { toast } from 'sonner';
import { X, Bold, Italic, List, ListOrdered, Link, Calendar } from 'lucide-react';
import { Textarea } from '../../components/ui/textarea';
import { Slider } from '../../components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Skill } from '../../types';

export function SkillsExpForm({ skillsData, experiencesData }: { skillsData: any, experiencesData: any }) {
  const { formData, addSkill, removeSkill, updateSkill, addExperience, updateExperience, removeExperience } = usePortfolio();
  const { skills, experiences } = formData;

  useEffect(() => {
    if (skillsData) {
      skillsData.forEach((skill: any) => {
        addSkill(skill.name, skill.category, skill.proficiency);
      });
      console.log("skillsData", skillsData)
    }
    if (experiencesData) {
      experiencesData.forEach((experience: any) => {
        addExperience(experience);
      });
      console.log("experiencesData", experiencesData)
    }
  }, [skillsData, experiencesData]);
  
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'tools' | 'additional'>('technical');
  const [selectedProficiency, setSelectedProficiency] = useState<number>(50); // Default to 50%
  const [experienceState, setExperienceState] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    isOngoing: false,
    description: '',
    bullets: ['']
  });
  const [editMode, setEditMode] = useState(false);
  const [currentExpId, setCurrentExpId] = useState<string | null>(null);

  // Filter skills by category
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const toolSkills = skills.filter(skill => skill.category === 'tools');
  const additionalSkills = skills.filter(skill => skill.category === 'additional');

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      toast.error('Please enter a skill name');
      return;
    }
    
    // Check for duplicates within the same category
    if (skills.some(skill => 
        skill.name.toLowerCase() === newSkill.toLowerCase() && 
        skill.category === selectedCategory)) {
      toast.error('This skill already exists in this category');
      return;
    }
    
    // Add proficiency for technical skills only
    if (selectedCategory === 'technical') {
      addSkill(newSkill, selectedCategory, selectedProficiency);
    } else {
      addSkill(newSkill, selectedCategory);
    }
    
    setNewSkill('');
  };

  const handleUpdateSkillProficiency = (skillId: string, proficiency: number) => {
    updateSkill(skillId, { proficiency });
  };

  const handleBulletChange = (index: number, value: string) => {
    const updatedBullets = [...experienceState.bullets];
    updatedBullets[index] = value;
    setExperienceState({ ...experienceState, bullets: updatedBullets });
  };

  const addBulletPoint = () => {
    setExperienceState({ 
      ...experienceState, 
      bullets: [...experienceState.bullets, ''] 
    });
  };

  const removeBulletPoint = (index: number) => {
    if (experienceState.bullets.length <= 1) return;
    
    const updatedBullets = experienceState.bullets.filter((_, i) => i !== index);
    setExperienceState({ ...experienceState, bullets: updatedBullets });
  };

  const handleToggleOngoing = (checked: boolean) => {
    setExperienceState({
      ...experienceState,
      isOngoing: checked,
      endDate: checked ? 'Present' : ''
    });
  };

  const handleSubmitExperience = () => {
    // Validate required fields
    if (!experienceState.title || !experienceState.company || !experienceState.startDate) {
      toast.error('Please fill out all required fields');
      return;
    }

    // Filter out empty bullet points
    const filteredBullets = experienceState.bullets.filter(bullet => bullet.trim() !== '');
    
    if (editMode && currentExpId) {
      updateExperience({
        id: currentExpId,
        title: experienceState.title,
        company: experienceState.company,
        startDate: experienceState.startDate,
        endDate: experienceState.isOngoing ? 'Present' : experienceState.endDate,
        isOngoing: experienceState.isOngoing,
        description: experienceState.description,
        bullets: filteredBullets
      });
      toast.success('Experience updated successfully');
    } else {
      addExperience({
        title: experienceState.title,
        company: experienceState.company,
        startDate: experienceState.startDate,
        endDate: experienceState.isOngoing ? 'Present' : experienceState.endDate,
        isOngoing: experienceState.isOngoing,
        description: experienceState.description,
        bullets: filteredBullets
      });
      toast.success('Experience added successfully');
    }
    
    resetExperienceForm();
  };

  const resetExperienceForm = () => {
    setExperienceState({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
      description: '',
      bullets: ['']
    });
    setEditMode(false);
    setCurrentExpId(null);
  };

  const handleEditExperience = (exp: typeof experiences[0]) => {
    setExperienceState({
      title: exp.title,
      company: exp.company,
      startDate: exp.startDate || '',
      endDate: exp.isOngoing ? '' : (exp.endDate || ''),
      isOngoing: exp.isOngoing || false,
      description: exp.description,
      bullets: exp.bullets.length > 0 ? exp.bullets : ['']
    });
    setEditMode(true);
    setCurrentExpId(exp.id);
  };

  const validateForm = () => {
    // Make sure we have at least one skill and one experience
    if (technicalSkills.length === 0 && toolSkills.length === 0 && additionalSkills.length === 0) {
      toast.error('Please add at least one skill');
      return false;
    }
    
    if (experiences.length === 0) {
      toast.error('Please add at least one experience');
      return false;
    }
    
    return true;
  };

  // Helper function to get proficiency description based on percentage
  const getProficiencyDescription = (percentage: number): string => {
    if (percentage < 25) return 'Beginner';
    if (percentage < 50) return 'Intermediate';
    if (percentage < 75) return 'Advanced';
    return 'Expert';
  };

  // Helper function to get proficiency color based on percentage
  const getProficiencyColor = (percentage: number): string => {
    if (percentage < 25) return 'bg-blue-100 text-blue-800';
    if (percentage < 50) return 'bg-green-100 text-green-800';
    if (percentage < 75) return 'bg-purple-100 text-purple-800';
    return 'bg-orange-100 text-orange-800';
  };

  const renderTechnicalSkillList = () => (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex-1">
            <Input
              placeholder="Add a technical skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full"
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Label>Proficiency: {selectedProficiency}%</Label>
              <span className="text-sm text-muted-foreground">
                {getProficiencyDescription(selectedProficiency)}
              </span>
            </div>
            <Slider
              value={[selectedProficiency]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => setSelectedProficiency(value[0])}
              className="w-full"
            />
          </div>
        </div>
        <Button onClick={handleAddSkill}>Add Skill</Button>
      </div>

      {technicalSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Technical Skills</p>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map(skill => (
              <div 
                key={skill.id} 
                className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border"
              >
                <span className="font-medium">{skill.name}</span>
                <div className="w-full sm:w-48 flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${getProficiencyColor(skill.proficiency || 50)}`}>
                      {getProficiencyDescription(skill.proficiency || 50)}
                    </span>
                    <span className="text-xs font-medium">{skill.proficiency || 50}%</span>
                  </div>
                  <Slider
                    value={[skill.proficiency || 50]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleUpdateSkillProficiency(skill.id, value[0])}
                    className="w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-gray-500 hover:text-gray-700 ml-1 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderOtherSkillList = (categorySkills: Skill[], category: string) => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder={`Add a ${category} skill`}
          value={selectedCategory === (category.toLowerCase() as 'technical' | 'tools' | 'additional') ? newSkill : ''}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <Button onClick={handleAddSkill}>Add Skill</Button>
      </div>

      {categorySkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {categorySkills.map(skill => (
            <div 
              key={skill.id} 
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              <span>{skill.name}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-blue-800 hover:text-blue-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Skills & Experience</h2>
      
      <div className="space-y-8">
        {/* Skills Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Key Skills</h3>
          
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger 
                value="technical" 
                onClick={() => setSelectedCategory('technical')}
                className="text-center"
              >
                Technical Skills
              </TabsTrigger>
              <TabsTrigger 
                value="tools" 
                onClick={() => setSelectedCategory('tools')}
                className="text-center"
              >
                Tools & Workflows
              </TabsTrigger>
              <TabsTrigger 
                value="additional" 
                onClick={() => setSelectedCategory('additional')}
                className="text-center"
              >
                Additional Skills
              </TabsTrigger>
            </TabsList>
            <TabsContent value="technical" className="p-4 border rounded-md">
              <h4 className="text-lg font-medium mb-3">Technical Skills</h4>
              <p className="text-sm text-muted-foreground mb-4">Add programming languages, frameworks, methodologies, etc.</p>
              {renderTechnicalSkillList()}
            </TabsContent>
            <TabsContent value="tools" className="p-4 border rounded-md">
              <h4 className="text-lg font-medium mb-3">Tools & Workflows</h4>
              <p className="text-sm text-muted-foreground mb-4">Add software, platforms, tools you're proficient with</p>
              {renderOtherSkillList(toolSkills, 'Tools')}
            </TabsContent>
            <TabsContent value="additional" className="p-4 border rounded-md">
              <h4 className="text-lg font-medium mb-3">Additional Skills</h4>
              <p className="text-sm text-muted-foreground mb-4">Add soft skills, languages, certifications, etc.</p>
              {renderOtherSkillList(additionalSkills, 'Additional')}
            </TabsContent>
          </Tabs>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Experience {editMode && "(Editing)"}</h3>

          <div className="space-y-4 border p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="input-label">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="Data Analyst"
                  value={experienceState.title}
                  onChange={(e) => setExperienceState({ ...experienceState, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="input-label">Company *</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={experienceState.company}
                  onChange={(e) => setExperienceState({ ...experienceState, company: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="input-label flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="month"
                  placeholder="YYYY-MM"
                  value={experienceState.startDate}
                  onChange={(e) => setExperienceState({ ...experienceState, startDate: e.target.value })}
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="endDate" className="input-label flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="endDate"
                    type="month"
                    placeholder="YYYY-MM"
                    value={experienceState.endDate}
                    onChange={(e) => setExperienceState({ ...experienceState, endDate: e.target.value })}
                    disabled={experienceState.isOngoing}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={experienceState.isOngoing}
                    onCheckedChange={handleToggleOngoing}
                    id="ongoing-experience"
                  />
                  <Label htmlFor="ongoing-experience" className="text-sm cursor-pointer">
                    Currently working here
                  </Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="input-label">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your role and responsibilities"
                value={experienceState.description}
                onChange={(e) => setExperienceState({ ...experienceState, description: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="input-label">Key Achievements/Responsibilities</Label>
              
              {experienceState.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <Input
                    placeholder="Achieved X by doing Y, resulting in Z"
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBulletPoint(index)}
                    disabled={experienceState.bullets.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addBulletPoint}
              >
                Add Bullet Point
              </Button>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              {editMode && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={resetExperienceForm}
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="button"
                onClick={handleSubmitExperience}
              >
                {editMode ? 'Update' : 'Add'} Experience
              </Button>
            </div>
          </div>

          {experiences.length > 0 && (
            <div className="space-y-4 mt-6">
              <h4 className="text-lg font-medium">Added Experiences</h4>
              
              {experiences.map((exp) => (
                <div key={exp.id} className="border p-4 rounded-md bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{exp.title}</h5>
                      <div className="text-gray-600">
                        {exp.company} • {exp.startDate} to {exp.isOngoing ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditExperience(exp)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          removeExperience(exp.id);
                          toast.success('Experience removed');
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                  
                  {exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-gray-700">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <NavigationButtons onNext={validateForm} />
    </div>
  );
}
