import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
export const MovieContext = createContext();
export const useMovieContex = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMovies = async (url) => {
    try {
      const res = await axios(url);
      console.log(res.data.results);
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const moviePages = async (page) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const trendingMovies = async () => {
    setLoading(true);
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=3`
      );
      console.log(res.data);
      setLoading(false);
    } catch (error) {}
  };
  const popularMovies = async () => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/12?api_key=${API_KEY}`
      );
      console.log(res.data);
    } catch (error) {}
  };
  const withGenresSaerch = async () => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`
      );
      console.log(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies(FEATURED_API);
    trendingMovies();
    popularMovies();
    withGenresSaerch();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, getMovies, moviePages }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
