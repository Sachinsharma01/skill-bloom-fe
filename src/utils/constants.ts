import { Certificate, TemplateType } from '../types'

export const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    name: 'Excel: Mother of Business Intelligence',
    issuer: 'Codebasics',
    date: '2022',
    selected: false,
  },
  {
    id: 'cert2',
    name: 'Get Job Ready: Power BI Data Analytics for All Levels 3.0',
    issuer: 'Codebasics',
    date: '2022',
    selected: false,
  },
  {
    id: 'cert3',
    name: 'SQL Beginner to Advanced For Data Professionals',
    issuer: 'Codebasics',
    date: '2022',
    selected: false,  
  },
]

export const TEMPLATES: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'original',
    name: 'Original Old (But Gold)',
    description: 'A classic professional template with a touch of gold',
  },
  {
    id: 'dark',
    name: 'Dark (The Dope)',
    description: 'Modern dark theme with vibrant accents',
  },
  {
    id: 'clean',
    name: 'Clean (And Clever)',
    description: 'Minimalist design for a clean professional look',
  },
  {
    id: 'matrix',
    name: 'Matrix (To Match Your Vibe)',
    description: 'Tech-inspired theme with matrix-like elements',
  },
  {
    id: 'starforce',
    name: 'Starforce (Sharp and Neat)',
    description: 'Bold theme with strong visual hierarchy',
  },
  {
    id: 'daylight',
    name: 'Daylight (A Fresh Start)',
    description: 'Bright and airy design for a friendly approach',
  },
]

export const BUCKET_NAMES = {
  DOCUMENTS: 'documents',
  PROFILE: 'profile',
  RESUME: 'resumes',
  PORTFOLIO: 'portfolio',
}
