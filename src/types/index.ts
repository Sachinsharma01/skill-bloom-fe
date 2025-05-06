
export type FormStep = 'basicInfo' | 'education' | 'skillsExp' | 'projects' | 'certificates' | 'template' | 'preview';

export interface BasicInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  position: string;
  linkedinProfile: string;
  githubProfile: string;
  introVideoLink: string;
  photo: File | null;
  photoUrl: string;
  aboutYourself: string;
  resume: File | null;
  resumeUrl: string;
  hideEmail: boolean;
  hidePhone: boolean;
  hideResume: boolean;
  hideFromSearch: boolean;
  whatYouDo?: string;
  headline?: string;
  whatYouDoHeadline?: string;
}

export interface Education {
  id: string;
  collegeName: string;
  degree: string;
  location: string;
  startDate: string; // Format: YYYY-MM
  endDate: string | "Present"; // Format: YYYY-MM or "Present"
  description?: string;
  achievements: string[];
  keySkills: string[];
  websiteLink?: string;
}

// Updated Skill interface to include percentage-based proficiency for technical skills
export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'tools' | 'additional';
  proficiency?: number; // 0-100 for percentage
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string; // Format: YYYY-MM
  endDate: string; // Format: YYYY-MM or "Present"
  isOngoing: boolean; // New field for ongoing experiences
  description: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  status: 'active' | 'completed' | 'ongoing';
  // New fields
  thumbnail: File | null;
  thumbnailUrl: string;
  banner: File | null;
  bannerUrl: string;
  role: string;
  startDate: string; // Format: YYYY-MM
  endDate: string; // Format: YYYY-MM
  isOngoing: boolean; // New field for ongoing projects
  overview: string;
  challenges: string;
  solution: string;
  keyFeatures: string[];
  liveLink: string;
  projectImages: File[];
  projectImageUrls: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  selected: boolean;
}

export type TemplateType = 'original' | 'dark' | 'clean' | 'matrix' | 'starforce' | 'daylight';

export interface PortfolioFormData {
  basicInfo: BasicInfo;
  education: Education[];
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
  selectedTemplate: TemplateType;
}
