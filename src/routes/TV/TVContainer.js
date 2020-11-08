import React, { useState, useEffect } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from '../../api';

const TVContainer = () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getShows() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);
    } catch {
      setError("Can't find TV information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getShows();
  }, []);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
};

export default TVContainer;
