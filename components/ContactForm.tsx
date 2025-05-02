'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ContactForm() {
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  // Map URL parameter values to valid subject options
  useEffect(() => {
    if (!searchParams) return;
    
    const subjectParam = searchParams.get('subject')
    
    if (subjectParam) {
      // Mapping of URL parameters to valid dropdown options
      const subjectMapping: Record<string, string> = {
        'speaking': 'Speaking Inquiry',
        'consulting': 'Consulting',
        'feedback': 'Article Feedback'
      }
      
      // Only set the subject if the parameter maps to a valid option
      if (subjectMapping[subjectParam.toLowerCase()]) {
        setFormData(prev => ({
          ...prev,
          subject: subjectMapping[subjectParam.toLowerCase()]
        }))
      }
    }
  }, [searchParams])

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error',
    message?: string
  }>({
    status: 'idle'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormStatus({ status: 'submitting' })

    try {
      // Submit form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        setFormStatus({
          status: 'success',
          message: data.message || 'Your message has been sent! I\'ll get back to you soon.'
        });
      } else {
        // Handle error response
        setFormStatus({
          status: 'error',
          message: data.message || 'There was an error sending your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        status: 'error',
        message: 'There was an error connecting to the server. Please try again later.'
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status message */}
      {formStatus.status !== 'idle' && formStatus.message && (
        <div className={`p-4 rounded-lg ${
          formStatus.status === 'success' 
            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {formStatus.message}
        </div>
      )}

      {/* Name field */}
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input w-full"
          disabled={formStatus.status === 'submitting'}
        />
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input w-full"
          disabled={formStatus.status === 'submitting'}
        />
      </div>

      {/* Subject field */}
      <div>
        <label htmlFor="subject" className="form-label">Subject</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-input w-full"
          disabled={formStatus.status === 'submitting'}
        >
          <option value="">Please select</option>
          <option value="Speaking Inquiry">Speaking Inquiry</option>
          <option value="Consulting">Consulting</option>
          <option value="Article Feedback">Article Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="form-input w-full"
          style={{
            minHeight: '120px',
            height: 'auto'
          }}
          disabled={formStatus.status === 'submitting'}
        />
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={formStatus.status === 'submitting'}
        >
          {formStatus.status === 'submitting' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
      </div>
    </form>
  )
}