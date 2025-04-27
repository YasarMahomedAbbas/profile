import { cache } from 'react';

// Define types for our data
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  links: {
    github?: string;
    live: string;
  };
}

export interface TechItem {
  name: string;
  icon: string;
  projects: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  keyActivities: string[];
}

export interface Career {
  id: number;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  techStack: string[];
}

export interface HobbyItem {
  name: string;
  icon: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  languages: string[];
  hobbies: string[];
  hobbiesDetail?: HobbyItem[];
  highlightedSkills: string[];
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  projects: Project[];
  techStack: {
    [category: string]: TechItem[];
  };
  education: Education[];
  career: Career[];
  skills?: Array<{ category: string; items: string[] }>;
}

// Import data directly - Next.js will handle this during build time
import profileData from '@/data/profile-data.json';

// Cache the data access functions
export const getProfileData = cache((): ProfileData => {
  return profileData as unknown as ProfileData;
});

// Helper functions to get specific data
export const getProjects = cache((): Project[] => {
  return getProfileData().projects;
});

export const getTechStack = cache(() => {
  return getProfileData().techStack;
});

export const getEducation = cache((): Education[] => {
  return getProfileData().education;
});

export const getCareer = cache((): Career[] => {
  return getProfileData().career;
});

// Function to get a specific project by ID
export const getProjectById = cache((id: number): Project | undefined => {
  return getProjects().find(project => project.id === id);
}); 