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
  const [popular, setPopular] = useState([]);
  const [now, setNow] = useState([]);

  const [loading, setLoading] = useState(false);
  const getMovies = async (url) => {
    setLoading(true)
    try {
      const res = await axios(url);
      console.log(res.data.results);
      setMovies(res.data.results);
      setLoading(false)
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

  const popularMovies = async (e) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      console.log(res.data.results);
      setPopular(res.data.results);
      console.log(popular);
    } catch (error) {
      console.log(error);
    }
  };
  const nowPlaying = async (e) => {
    setLoading(true)
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
      );
      console.log(res.data.results);
      setNow(res.data.results);
      console.log(now)
      setLoading(false)
    } catch (error) {}
  };
  console.log(now)
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

    popularMovies();
    withGenresSaerch();
    popularMovies();
    nowPlaying();
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
        popular,
        nowPlaying,
        now,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
