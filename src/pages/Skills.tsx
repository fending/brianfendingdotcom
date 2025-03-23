// src/pages/Skills.tsx

import { useEffect, useState } from "react";

interface SkillCategory {
  category: string;
  skills: string[];
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);

  useEffect(() => {
    fetch("/static/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">Skills</h1>
      {skills.map((group, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-2xl font-semibold">{group.category}</h2>
          <ul className="list-disc pl-5">
            {group.skills.map((skill, i) => (
              <li key={i} className="text-gray-700">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skills;