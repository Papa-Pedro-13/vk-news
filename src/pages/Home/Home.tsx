import { useState } from 'react';
import NewsList from '../../widgets/NewsList/NewsList';
import styles from './home.module.css';
const Home = () => {
  const [sortType, setSortType] = useState('newstories');

  return (
    <div className={styles.home}>
      <div className={styles.list}>
        <button onClick={() => setSortType('newstories')}>New Stories</button>
        <button onClick={() => setSortType('topstories')}>Top Stories</button>
        <button onClick={() => setSortType('beststories')}>Best Stories</button>
      </div>
      <NewsList sortType={sortType} />
    </div>
  );
};

export default Home;
