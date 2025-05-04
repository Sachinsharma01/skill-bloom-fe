import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  userId: string;
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website: string;
    location: string;
    about: string;
  };
  skills: string[];
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
}

const PortfolioSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  personal: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
    location: { type: String },
    about: { type: String, required: true }
  },
  skills: [{ type: String }],
  experience: [{
    id: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true }
  }],
  projects: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: String, required: true },
    link: { type: String }
  }],
  education: [{
    id: { type: String, required: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema); 