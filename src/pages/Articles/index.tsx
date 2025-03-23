// src/pages/Articles/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../config/api";

interface Article {
  id: number;
  title: string;
  summary: string;
  slug: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">Articles</h1>
      <ul className="mt-4 space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded shadow-md hover:shadow-lg transition">
            <Link to={`/articles/${article.slug}`} className="text-2xl font-semibold hover:text-blue-500">
              {article.title}
            </Link>
            <p className="text-gray-600">{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;