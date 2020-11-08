import React, { useState, useEffect } from 'react';
import HomePresenter from './HomePresenter';
import { moviesApi } from 'api';

const HomeContainer = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [upComing, setUpComing] = useState(null);
  const [popular, setPopular] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getMovies() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upComing },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setNowPlaying(nowPlaying);
      setUpComing(upComing);
      setPopular(popular);
    } catch {
      setError("Can't find movie information");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upComing={upComing}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

export default HomeContainer;
