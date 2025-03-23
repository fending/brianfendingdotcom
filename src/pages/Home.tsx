// src/pages/Home.tsx

import { useEffect, useState } from "react";

interface HomeContent {
  title: string;
  description: string;
  sections: { title: string; content: string }[];
}

const Home = () => {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    fetch("/static/home.json") // Simulated API call
      .then((res) => res.json())
      .then((data) => setContent(data));
  }, []);

  if (!content) return <div className="text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-300">
      <h1 className="text-5xl font-bold text-white">{content.title}</h1>
      <p className="text-lg mt-2">{content.description}</p>

      {content.sections.map((section, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
          <p className="text-gray-400">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;