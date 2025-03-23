// src/pages/Articles/ArticleDetail.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Article {
  id: number;
  title: string;
  content: string;
}

const ArticleDetail = () => {
  const { slug } = useParams(); // ✅ Fixes `useParams` for react-router-dom@6
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`/static/articles.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundArticle = data.find((a: Article) => a.id.toString() === slug);
        setArticle(foundArticle || null);
      });
  }, [slug]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="mt-4 text-gray-700">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;