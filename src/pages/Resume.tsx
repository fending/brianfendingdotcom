// src/pages/Resume.tsx

const Resume = () => {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold">Resume</h1>
        <p className="mt-4 text-gray-700">Download my latest resume below:</p>
        <a href="/static/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded">
          Download Resume (PDF)
        </a>
      </div>
    );
  };
  
  export default Resume;