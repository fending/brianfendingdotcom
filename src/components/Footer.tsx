// src/components/Footer.tsx

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center mt-10">
      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()} Brian Fending. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6">
        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        <a href="https://www.linkedin.com/in/brianfending/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;