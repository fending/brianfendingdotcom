'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

// Form validation types
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  // Validation state
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
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
  
  // Validate a single field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'subject':
        if (!value) return 'Please select a subject';
        return undefined;
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return undefined;
      
      default:
        return undefined;
    }
  };
  
  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Check each field
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value as string);
      if (error) {
        newErrors[name as keyof FormErrors] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  }
  
  // Handle field blur event
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Mark as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all fields before submission
    const isValid = validateForm();
    if (!isValid) {
      // Mark all fields as touched to show errors
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      
      setFormStatus({ 
        status: 'error',
        message: 'Please correct the errors in the form'
      });
      return;
    }
    
    setFormStatus({ status: 'submitting' })

    try {
      // Rate limiting: Prevent multiple submissions
      const lastSubmission = localStorage.getItem('lastFormSubmission');
      const now = new Date().getTime();
      
      if (lastSubmission) {
        const timeSince = now - parseInt(lastSubmission, 10);
        // 60 second rate limit
        if (timeSince < 60000) {
          throw new Error(`Please wait before submitting again (${Math.ceil(60 - timeSince/1000)} seconds)`);
        }
      }
      
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
        // Save submission timestamp for rate limiting
        localStorage.setItem('lastFormSubmission', now.toString());
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Reset touched state
        setTouched({});
        
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
        message: error instanceof Error ? error.message : 'There was an error connecting to the server. Please try again later.'
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
          onBlur={handleBlur}
          className={`form-input w-full ${touched.name && errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={formStatus.status === 'submitting'}
          aria-invalid={touched.name && errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
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
          onBlur={handleBlur}
          className={`form-input w-full ${touched.email && errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={formStatus.status === 'submitting'}
          aria-invalid={touched.email && errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Subject field */}
      <div>
        <label htmlFor="subject" className="form-label">Subject</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input w-full ${touched.subject && errors.subject ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={formStatus.status === 'submitting'}
          aria-invalid={touched.subject && errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        >
          <option value="">Please select</option>
          <option value="Speaking Inquiry">Speaking Inquiry</option>
          <option value="Consulting">Consulting</option>
          <option value="Article Feedback">Article Feedback</option>
          <option value="Other">Other</option>
        </select>
        {touched.subject && errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
        )}
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
          onBlur={handleBlur}
          className={`form-input w-full ${touched.message && errors.message ? 'border-red-500 dark:border-red-400' : ''}`}
          style={{
            minHeight: '120px',
            height: 'auto'
          }}
          disabled={formStatus.status === 'submitting'}
          aria-invalid={touched.message && errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Form data protection note */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Your information is stored securely and never shared with third parties.
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