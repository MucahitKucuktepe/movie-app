import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
export const MovieContext = createContext();
export const useMovieContex = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const MovieContextProvider = ({ children }) => {
  const getMovies = async () => {
    try {
      const res = await axios(FEATURED_API);
      console.log(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const trendingMovies = async () => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=3`
      );
      console.log(res.data);
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
          console.log(res.data.results)
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(() => {
    getMovies();
    trendingMovies();
    popularMovies();
    withGenresSaerch()
  }, []);

  return <MovieContext.Provider value={null}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
