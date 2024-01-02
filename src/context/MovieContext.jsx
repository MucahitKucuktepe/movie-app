import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
export const MovieContext = createContext();
export const useMovieContex = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const MovieContextProvider = ({ children }) => {
  const page = 1;
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
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const popularMovies = async (page) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      console.log(res.data);
      setMovies(res.data.results);
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

    // popularMovies();
    withGenresSaerch();
    // topRatedMovies()
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        getMovies,
        moviePages,
        popularMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
