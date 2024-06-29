import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsCard from '../NewsCard/NewsCard';
import styles from './newsList.module.css';
interface NewsListProps {
  sortType: string;
}

export interface NewsCardProps {
  id: number;
  title: string;
  by: string;
  score: number;
  url: string;
  kids?: number[];
}

const NewsList: React.FC<NewsListProps> = ({ sortType }) => {
  const [items, setItems] = useState<NewsCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const fetchNews = useCallback(
    async (reset = false) => {
      const limit = 15;
      const url = `https://hacker-news.firebaseio.com/v0/${sortType}.json`;
      const response = await fetch(url);
      const ids: number[] = await response.json();
      const paginatedIds = ids.slice(0, limit * page);

      const NewsCards = await Promise.all(
        paginatedIds.map(async (id) => {
          const itemResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const itemData: NewsCardProps = await itemResponse.json();
          return itemData;
        })
      );

      if (reset) {
        setItems(NewsCards);
      } else {
        setItems((prevItems) => [
          ...prevItems,
          ...NewsCards.slice((page - 1) * limit),
        ]);
      }
      if (NewsCards.length < limit * page) {
        setHasMore(false);
      }
    },
    [sortType, page]
  );

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      setPage(1);
      fetchNews(true);
    }, 30000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sortType]);

  useEffect(() => {
    fetchNews();
  }, [page, sortType]);

  const handleManualRefresh = () => {
    setPage(1);
    fetchNews(true);
    resetTimer();
  };

  return (
    <div>
      <button
        onClick={handleManualRefresh}
        className={styles.button}
      >
        Refresh News
      </button>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className={styles.list}
        endMessage={<p>No more news</p>}
      >
        {items.map((item) => (
          <NewsCard
            key={item.id}
            {...item}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsList;
