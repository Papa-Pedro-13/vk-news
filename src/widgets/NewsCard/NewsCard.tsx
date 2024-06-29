import { Link } from 'react-router-dom';
import { NewsCardProps } from '../NewsList/NewsList';

const NewsCard: React.FC<NewsCardProps> = ({ id, title, by, score }) => {
  return (
    <div>
      <Link to={`/news/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>By: {by}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default NewsCard;
