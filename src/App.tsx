import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
// 記事のIDを取得する関数
const fetchStoryIds = async (category: string): Promise<number[]> => {
  const response = await fetch(`${BASE_URL}/${category}stories.json`);
  const data = await response.json();
  return data;
};
// 記事の詳細を取得する関数
const fetchStory = async (id: number): Promise<any> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  const story = await response.json();
  return story;
};

const App: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [category, setCategory] = useState('top');

  useEffect(() => {
    const fetchStories = async () => {
      const ids = await fetchStoryIds(category);
      const storiesPromises = ids.slice(0, 10).map(id => fetchStory(id));
      const stories = await Promise.all(storiesPromises);
      setStories(stories);
    };
    fetchStories();
  }, [category]);

  return (
    <div  className="container is-max-widescreen">
      <header>
        <h1 className="title is-1 is-spaced">Hacker News</h1>

        <div className="tabs is-centered is-boxed is-medium">
          <ul>
            <li onClick={() => setCategory('top')}
              className={category === 'top' ? 'is-active' : ''}>
              <a>
                <span>TOP</span>
              </a>
            </li>

            <li onClick={() => setCategory('new')}
              className={category === 'new' ? 'is-active' : ''}>
              <a>
                <span>NEW</span>
              </a>
            </li>

            <li onClick={() => setCategory('best')}
              className={category === 'best' ? 'is-active' : ''}>
              <a>
                <span>BEST</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

