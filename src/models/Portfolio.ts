import mongoose, { Schema, Document } from 'mongoose';

// Interface for Basic Info
interface IBasicInfo {
  fullName: string;
  position: string;
  headline?: string;
  city?: string;
  photoUrl?: string;
  email?: string;
  phoneNumber?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  resumeUrl?: string;
  hideEmail?: boolean;
  hidePhone?: boolean;
  hideResume?: boolean;
  whatYouDo?: string;
  whatYouDoHeadline?: string;
  aboutYourself?: string;
}

// Interface for Education
interface IEducation {
  id: string;
  degree: string;
  collegeName: string;
  startDate: string;
  endDate: string | "Present";
  location?: string;
  websiteLink?: string;
  description?: string;
  achievements: string[];
  keySkills: string[];
}

// Interface for Skills
interface ISkill {
  id: string;
  name: string;
  category: 'technical' | 'tools' | 'additional';
}

// Interface for Experience
interface IExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  description?: string;
  bullets: string[];
}

// Interface for Project
interface IProject {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'inactive';
  technologies: string[];
  link?: string;
}

// Interface for Certificate
interface ICertificate {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  selected: boolean;
}

// Interface for Portfolio Document
interface IPortfolio extends Document {
  basicInfo: IBasicInfo;
  education: IEducation[];
  skills: ISkill[];
  experiences: IExperience[];
  projects: IProject[];
  certificates: ICertificate[];
  selectedTemplate: 'dark' | 'original' | 'clean' | 'matrix' | 'starforce';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const PortfolioSchema = new Schema<IPortfolio>({
  basicInfo: {
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    headline: { type: String },
    city: { type: String },
    photoUrl: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    linkedinProfile: { type: String },
    githubProfile: { type: String },
    resumeUrl: { type: String },
    hideEmail: { type: Boolean, default: false },
    hidePhone: { type: Boolean, default: false },
    hideResume: { type: Boolean, default: false },
    whatYouDo: { type: String },
    whatYouDoHeadline: { type: String },
    aboutYourself: { type: String }
  },
  education: [{
    id: { type: String, required: true },
    degree: { type: String, required: true },
    collegeName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String },
    websiteLink: { type: String },
    description: { type: String },
    achievements: [{ type: String }],
    keySkills: [{ type: String }]
  }],
  skills: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['technical', 'tools', 'additional']
    }
  }],
  experiences: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isOngoing: { type: Boolean, default: false },
    description: { type: String },
    bullets: [{ type: String }]
  }],
  projects: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      required: true,
      enum: ['active', 'completed', 'inactive']
    },
    technologies: [{ type: String }],
    link: { type: String }
  }],
  certificates: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String },
    selected: { type: Boolean, default: false }
  }],
  selectedTemplate: {
    type: String,
    required: true,
    enum: ['dark', 'original', 'clean', 'matrix', 'starforce']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create and export the model
const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
export { 
  IPortfolio, 
  IBasicInfo, 
  IEducation, 
  ISkill, 
  IExperience, 
  IProject, 
  ICertificate 
}; 