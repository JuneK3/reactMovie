import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

const DetailContainer = () => {
  let location = useLocation();
  let history = useHistory();
  let { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMovie, setIsMovie] = useState(location.pathname.includes('/movie/'));

  async function getResults() {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return history.push('/');
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      setError("Can't find details.");
    } finally {
      console.log(result);
      setResult(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <DetailPresenter
      isMovie={isMovie}
      result={result}
      loading={loading}
      error={error}
    />
  );
};

export default DetailContainer;
