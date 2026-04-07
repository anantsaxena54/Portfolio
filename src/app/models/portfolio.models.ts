// src/app/models/portfolio.models.ts

export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  type: 'work' | 'education';
  points: string[];
  isOpen?: boolean;
}

export interface Project {
  num: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  locked?: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Certification {
  name: string;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}
