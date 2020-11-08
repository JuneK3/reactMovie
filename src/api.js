import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key,
    language: 'en-US',
  },
});

export const moviesApi = {
  popular: () => api.get('movie/popular'),
  upComing: () => api.get('movie/upcoming'),
  nowPlaying: () => api.get('movie/now_playing'),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get('search/tv', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
