import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../widgets/Comment/Comment';

import styles from './newsPage.module.css';
interface NewsItem {
  id: number;
  title: string;
  url: string;
  by: string;
  score: number;
  kids?: number[];
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<Record<string, string>>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const data: NewsItem = await response.json();
      setNewsItem(data);
      setLoading(false);
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <h1>
        <a href={newsItem?.url}>{newsItem?.title}</a>
      </h1>
      <p>By: {newsItem?.by}</p>
      <p>Score: {newsItem?.score}</p>
      <h2>Comments</h2>
      {newsItem?.kids &&
        newsItem.kids.map((commentId) => (
          <Comment
            key={commentId}
            commentId={commentId}
          />
        ))}
    </div>
  );
};

export default NewsDetail;
