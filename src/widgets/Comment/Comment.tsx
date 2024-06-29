import React, { useState, useEffect } from 'react';
import styles from './comment.module.css';
interface CommentProps {
  commentId: number;
}

interface CommentData {
  id: number;
  by: string;
  text: string;
  score: number;
  kids?: number[];
}

const Comment: React.FC<CommentProps> = ({ commentId }) => {
  const [comment, setComment] = useState<CommentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
      );
      const data: CommentData = await response.json();
      setComment(data);
      setLoading(false);
    };

    fetchComment();
  }, [commentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.comment}>
      <p>By: {comment?.by}</p>
      <p>Score: {comment?.score}</p>
      {comment?.text && (
        <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
      )}
      {comment?.kids &&
        comment.kids.map((childId) => (
          <Comment
            key={childId}
            commentId={childId}
          />
        ))}
    </div>
  );
};

export default Comment;
