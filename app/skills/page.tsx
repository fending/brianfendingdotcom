import { Metadata } from 'next'
import { getSkillsContent, SkillCategory } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Skills & Expertise',
  description: 'Brian Fending\'s professional skills and areas of expertise in technology leadership and software engineering.',
}

export default async function SkillsPage() {
  const content = await getSkillsContent()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="text-gray-900 dark:text-white">{content.title || 'Skills & Expertise'}</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          {content.description || 'My professional skills and areas of expertise.'}
        </p>
      </div>

      {content.skills && content.skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {content.skills.map((category: SkillCategory, index: number) => (
            <div key={index} className="feature-card">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {category.category}
              </h2>
              
              <ul className="space-y-3">
                {category.items.map((skill: string, skillIndex: number) => (
                  <li key={skillIndex} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Skills content is being updated. Check back soon!
        </div>
      )}
    </div>
  )
}