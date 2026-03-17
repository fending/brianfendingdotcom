import fs from 'fs'
import path from 'path'

// Define types based on your content structure
export interface HomeContent {
  title: string
  description: string
  capabilities: { title: string; description: string }[]
  sections?: { title: string; content: string }[]
}

/**
 * Reads the home content from the static JSON file
 */
export async function getHomeContent(): Promise<HomeContent> {
  // Define path to the static content
  const filePath = path.join(process.cwd(), 'public', 'static', 'home.json')
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as HomeContent
  } catch (error) {
    console.error('Error reading home content:', error)
    // Return fallback content if file is not found
    return {
      title: 'Brian Fending',
      description: 'Technology Leadership',
      capabilities: [
        {
          title: 'Advisory',
          description: 'AI governance and enablement advisory.'
        }
      ]
    }
  }
}

// Define the interface for skills content
export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SkillsContent {
  title: string;
  description: string;
  skills: SkillCategory[];
}

// Define types for talks content
export interface Talk {
  id: string;
  title: string;
  hook: string;
  takeaways: string[];
  formats: string[];
  tags: string[];
  relatedArticle?: string;
}

export interface PastEngagement {
  title: string;
  event: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
  slideUrl?: string;
  videoUrl?: string;
  tags: string[];
}

export interface TalksContent {
  title: string;
  description: string;
  intro: string;
  talks: Talk[];
  pastEngagements: PastEngagement[];
}

/**
 * Reads talks content from the static JSON file
 */
export async function getTalksContent(): Promise<TalksContent> {
  const filePath = path.join(process.cwd(), 'public', 'static', 'talks.json')

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as TalksContent
  } catch (error) {
    console.error('Error reading talks content:', error)
    return {
      title: 'Talks & Workshops',
      description: '',
      intro: '',
      talks: [],
      pastEngagements: []
    }
  }
}

/**
 * Reads skills content from the static JSON file
 */
export async function getSkillsContent(): Promise<SkillsContent> {
  const filePath = path.join(process.cwd(), 'public', 'static', 'skills.json')
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as SkillsContent
  } catch (error) {
    console.error('Error reading skills content:', error)
    return {
      title: 'Skills',
      description: 'My professional skills and expertise',
      skills: []
    }
  }
}