// src/components/Navigation.tsx

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <div className="text-2xl font-bold">
        <NavLink to="/" className="hover:text-gray-400">
          Brian Fending
        </NavLink>
      </div>
      <div className="flex space-x-8 text-lg">
        <NavLink to="/articles" className="hover:text-gray-400">Articles</NavLink>
        <NavLink to="/speaking" className="hover:text-gray-400">Speaking</NavLink>
        <NavLink to="/resume" className="hover:text-gray-400">Resume</NavLink>
        <NavLink to="/skills" className="hover:text-gray-400">Skills</NavLink>
        <NavLink to="/contact" className="hover:text-gray-400">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navigation;