
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { NavigationButtons } from './NavigationButtons';
import { toast } from 'sonner';
import { X, Edit, Trash, Upload, Calendar, Link, FileText, FileImage } from 'lucide-react';
import { Textarea } from '../../components/ui/textarea';
import { FileInput } from '../../components/ui/file-input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Project } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';

export function ProjectsForm() {
  const { formData, addProject, updateProject, removeProject } = usePortfolio();
  const { projects } = formData;

  const emptyProject: Omit<Project, 'id'> = {
    name: '',
    description: '',
    technologies: [],
    link: '',
    image: '',
    status: 'active',
    thumbnail: null,
    thumbnailUrl: '',
    banner: null,
    bannerUrl: '',
    role: '',
    startDate: '',
    endDate: '',
    isOngoing: false,
    overview: '',
    challenges: '',
    solution: '',
    keyFeatures: [],
    liveLink: '',
    projectImages: [],
    projectImageUrls: []
  };

  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>(emptyProject);
  
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleAddTechnology = () => {
    if (!newTech.trim()) return;
    
    if (projectForm.technologies.includes(newTech)) {
      toast.error('This technology is already added');
      return;
    }
    
    setProjectForm({
      ...projectForm,
      technologies: [...projectForm.technologies, newTech]
    });
    setNewTech('');
  };

  const handleRemoveTechnology = (tech: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter(t => t !== tech)
    });
  };

  const handleAddKeyFeature = () => {
    if (!newFeature.trim()) return;
    
    setProjectForm({
      ...projectForm,
      keyFeatures: [...projectForm.keyFeatures, newFeature]
    });
    setNewFeature('');
  };

  const handleRemoveKeyFeature = (feature: string) => {
    setProjectForm({
      ...projectForm,
      keyFeatures: projectForm.keyFeatures.filter(f => f !== feature)
    });
  };

  const handleThumbnailUpload = (file: File | null) => {
    setProjectForm({
      ...projectForm,
      thumbnail: file,
      // For demo purposes, create a temporary URL
      thumbnailUrl: file ? URL.createObjectURL(file) : ''
    });
  };

  const handleBannerUpload = (file: File | null) => {
    setProjectForm({
      ...projectForm,
      banner: file,
      // For demo purposes, create a temporary URL
      bannerUrl: file ? URL.createObjectURL(file) : ''
    });
  };

  const handleProjectImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setProjectForm({
        ...projectForm,
        projectImages: [...projectForm.projectImages, ...files],
        projectImageUrls: [
          ...projectForm.projectImageUrls,
          ...files.map(file => URL.createObjectURL(file))
        ]
      });
    }
  };

  const handleRemoveProjectImage = (index: number) => {
    const newImages = [...projectForm.projectImages];
    const newUrls = [...projectForm.projectImageUrls];
    
    newImages.splice(index, 1);
    newUrls.splice(index, 1);
    
    setProjectForm({
      ...projectForm,
      projectImages: newImages,
      projectImageUrls: newUrls
    });
  };

  const handleToggleOngoing = (checked: boolean) => {
    setProjectForm({
      ...projectForm,
      isOngoing: checked,
      endDate: checked ? '' : projectForm.endDate
    });
  };

  const handleAddProject = () => {
    // Validation
    if (!projectForm.name || !projectForm.description) {
      toast.error('Project name and description are required');
      return;
    }

    if (editingId) {
      updateProject({
        id: editingId,
        ...projectForm
      });
      toast.success('Project updated successfully');
      setEditingId(null);
    } else {
      addProject(projectForm);
      toast.success('Project added successfully');
    }

    // Reset form
    setProjectForm(emptyProject);
    setActiveTab('basic');
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      link: project.link,
      image: project.image,
      status: project.status,
      thumbnail: project.thumbnail,
      thumbnailUrl: project.thumbnailUrl,
      banner: project.banner,
      bannerUrl: project.bannerUrl,
      role: project.role,
      startDate: project.startDate,
      endDate: project.isOngoing ? '' : project.endDate,
      isOngoing: project.isOngoing || false,
      overview: project.overview,
      challenges: project.challenges,
      solution: project.solution,
      keyFeatures: project.keyFeatures,
      liveLink: project.liveLink,
      projectImages: project.projectImages,
      projectImageUrls: project.projectImageUrls
    });
    setEditingId(project.id);
    setActiveTab('basic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setProjectForm(emptyProject);
    setEditingId(null);
    setActiveTab('basic');
  };

  const validateForm = () => {
    // Make sure at least one project is added
    if (projects.length === 0) {
      toast.error('Please add at least one project');
      return false;
    }
    return true;
  };

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Projects <span className="text-muted-foreground text-sm font-normal">(Max 6 Projects)</span></h2>
      
      <div className="space-y-8">
        <div className="border p-6 rounded-lg bg-gray-50">
          <h3 className="text-xl font-medium mb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="features">Features & Tech</TabsTrigger>
              <TabsTrigger value="media">Images & Links</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectName" className="input-label">Project Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="Analytics Dashboard"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectStatus" className="input-label">Project Status</Label>
                  <Select
                    value={projectForm.status}
                    onValueChange={(value: 'active' | 'completed' | 'ongoing') => 
                      setProjectForm({ ...projectForm, status: value })
                    }
                  >
                    <SelectTrigger id="projectStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectStartDate" className="input-label flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <Input
                    id="projectStartDate"
                    type="month"
                    value={projectForm.startDate}
                    onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectEndDate" className="input-label flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                  <Input
                    id="projectEndDate"
                    type="month"
                    value={projectForm.endDate}
                    onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    disabled={projectForm.isOngoing}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      checked={projectForm.isOngoing}
                      onCheckedChange={handleToggleOngoing}
                      id="ongoing-project"
                    />
                    <Label htmlFor="ongoing-project" className="text-sm cursor-pointer">
                      This is an ongoing project
                    </Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="projectRole" className="input-label">My Role in the Project</Label>
                <Input
                  id="projectRole"
                  placeholder="Lead Developer"
                  value={projectForm.role}
                  onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="projectDesc" className="input-label">Project Description *</Label>
                <Textarea
                  id="projectDesc"
                  placeholder="Provide a brief description of your project"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <div>
                <Label htmlFor="projectOverview" className="input-label flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Project Overview
                </Label>
                <Textarea
                  id="projectOverview"
                  placeholder="Provide a comprehensive overview of your project"
                  value={projectForm.overview}
                  onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                  className="min-h-[150px]"
                />
              </div>
              
              <div>
                <Label htmlFor="projectChallenges" className="input-label">Challenges</Label>
                <Textarea
                  id="projectChallenges"
                  placeholder="What challenges did you face during this project?"
                  value={projectForm.challenges}
                  onChange={(e) => setProjectForm({ ...projectForm, challenges: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="projectSolution" className="input-label">Solution & Approach</Label>
                <Textarea
                  id="projectSolution"
                  placeholder="How did you approach and solve the challenges?"
                  value={projectForm.solution}
                  onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-5">
              <div>
                <Label className="input-label mb-2 block">Key Features</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a key feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyFeature())}
                  />
                  <Button type="button" onClick={handleAddKeyFeature}>Add</Button>
                </div>
                
                {projectForm.keyFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {projectForm.keyFeatures.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyFeature(feature)}
                          className="text-green-800 hover:text-green-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label className="input-label mb-2 block">Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology (e.g., React, Python)"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                  />
                  <Button type="button" onClick={handleAddTechnology}>Add</Button>
                </div>
                
                {projectForm.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {projectForm.technologies.map((tech, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectLink" className="input-label flex items-center gap-1">
                    <Link className="h-4 w-4" />
                    GitHub/Source Link
                  </Label>
                  <Input
                    id="projectLink"
                    placeholder="https://github.com/username/project"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectLiveLink" className="input-label flex items-center gap-1">
                    <Link className="h-4 w-4" />
                    Live Demo Link
                  </Label>
                  <Input
                    id="projectLiveLink"
                    placeholder="https://myproject.com"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectThumbnail" className="input-label flex items-center gap-1 mb-2">
                    <FileImage className="h-4 w-4" />
                    Project Thumbnail
                  </Label>
                  <FileInput
                    id="projectThumbnail"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    maxSizeMB={2}
                    buttonText="Upload Thumbnail"
                  />
                  {projectForm.thumbnailUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                      <img 
                        src={projectForm.thumbnailUrl} 
                        alt="Thumbnail preview" 
                        className="w-full max-h-40 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="projectBanner" className="input-label flex items-center gap-1 mb-2">
                    <FileImage className="h-4 w-4" />
                    Project Banner
                  </Label>
                  <FileInput
                    id="projectBanner"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    maxSizeMB={3}
                    buttonText="Upload Banner"
                  />
                  {projectForm.bannerUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                      <img 
                        src={projectForm.bannerUrl} 
                        alt="Banner preview" 
                        className="w-full max-h-40 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="projectImages" className="input-label flex items-center gap-1 mb-2">
                  <Upload className="h-4 w-4" />
                  Project Screenshots/Images
                </Label>
                <div className="flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => document.getElementById('projectImagesInput')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add Project Images
                  </Button>
                  <span className="text-sm text-gray-500">
                    {projectForm.projectImages.length} image{projectForm.projectImages.length !== 1 ? 's' : ''} selected
                  </span>
                  <input
                    id="projectImagesInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleProjectImagesUpload}
                    className="hidden"
                  />
                </div>
                
                {projectForm.projectImageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {projectForm.projectImageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Project image ${index + 1}`} 
                          className="w-full h-32 object-cover rounded-md border" 
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveProjectImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="projectImage" className="input-label">Project Image URL (Alternative to upload)</Label>
                <Input
                  id="projectImage"
                  placeholder="https://example.com/project-image.jpg"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a URL for your project screenshot or image
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
            {editingId && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="button" 
              onClick={handleAddProject}
              disabled={projects.length >= 6 && !editingId}
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </div>

        {/* List of added projects */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Projects ({projects.length}/6)</h3>
            
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-4 bg-white">
                    <div className="flex items-center gap-3">
                      {project.thumbnailUrl ? (
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.name} 
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      ) : project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="w-16 h-16 object-cover rounded-md border" 
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <FileImage className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{project.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          {project.role && <span>Role: {project.role}</span>}
                          {project.startDate && (
                            <span>
                              {project.startDate} - {project.isOngoing ? 'Present' : project.endDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          removeProject(project.id);
                          toast.success('Project removed');
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {(project.technologies.length > 0 || project.keyFeatures.length > 0) && (
                    <div className="p-4 border-t bg-gray-50">
                      {project.technologies.length > 0 && (
                        <div className="mb-2">
                          <h5 className="text-sm font-medium mb-1">Technologies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {project.keyFeatures.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium mb-1">Key Features:</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.keyFeatures.map((feature, i) => (
                              <span 
                                key={i} 
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <NavigationButtons onNext={validateForm} />
    </div>
  );
}
