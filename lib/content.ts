import fs from 'fs'
import path from 'path'

// Define types based on your content structure
export interface HomeContent {
  title: string
  description: string
  sections: { title: string; content: string }[]
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
      sections: [
        {
          title: 'Welcome',
          content: 'Welcome to my site. Content is currently being updated.'
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