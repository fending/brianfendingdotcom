// src/pages/Contact.tsx

import { useState } from "react";

const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Opportunity",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(GOOGLE_FORMS_URL, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" onChange={handleChange} />
        <select name="subject" className="w-full p-2 border rounded" onChange={handleChange}>
          <option>Opportunity</option>
          <option>Consulting Engagement</option>
          <option>Speaking Engagement</option>
          <option>Media Inquiry</option>
          <option>Other</option>
        </select>
        <textarea name="message" placeholder="Message" required className="w-full p-2 border rounded" onChange={handleChange}></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Contact;