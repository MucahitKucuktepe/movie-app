import React, { useEffect, useRef, useState } from "react";
import { useMovieContex } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import spinner from "../assets/Spinner-1.1s-250px.png";
import { useAuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";
import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const TopRated = () => {
  const [page, setPage] = useState(1);
  const [isActiveMinus, setIsActiveMinus] = useState(false);
  const [isActivePlus, setIsActivePlus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  const { getMovies, movies } = useMovieContex();
  const { currentUser } = useAuthContext();
  const inputRef = useRef();
  console.log(movies);
  const topRatedMovies = async (page) => {
    setLoading(true);
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      console.log(res.data);
      setTop(res.data.results);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    topRatedMovies(1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value && currentUser) {
      getMovies(SEARCH_API + inputRef.current.value);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify("Please enter a text!");
    }

    console.log(inputRef.current.value);
  };
  const handleMinus = (e) => {
    if (page > 3) {
      setPage((prevPage) => prevPage - 3);
    }
    setIsActiveMinus(!isActiveMinus);
    setIsActivePlus(false);
    console.log(page);
    // console.log(currentPage);
    topRatedMovies(page - 3);
  };
  const handlePlus = (e) => {
    setPage((prevPage) => prevPage + 3);
    setIsActiveMinus(false);
    setIsActivePlus(!isActivePlus);
    console.log(page);
    topRatedMovies(page + 3);
  };
  const handlePage = (e) => {
    console.log(e.target.innerText);
    const currentPage = e.target.innerText;
    // setCurrentPage(e.target.innerText);
    console.log(currentPage);
    topRatedMovies(currentPage);
    setIsActiveMinus(false);
    setIsActivePlus(false);
  };
  return (
    <div className="mt-9">
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          // onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div className="justify-center text-center text-blue-600 mt-52">
            <img src={spinner} alt="" className="w-[100vw]" />
            <span>Loading...</span>
          </div>
        ) : (
          top.map((top) => <MovieCard key={top.id} {...top} />)
        )}
      </div>
      <div className="flex justify-center">
        <nav>
          <ul className="flex">
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-yellow-400 cursor-pointer ${
                isActiveMinus ? "bg-yellow-400" : ""
              } active:bg-yellow-400`}
              aria-label="Previous"
              onClick={handleMinus}
            >
              -
            </button>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer `}
              onClick={handlePage}
            >
              {page}
            </button>
            <li
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer"
              onClick={handlePage}
            >
              {page + 1}
            </li>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer"
              onClick={handlePage}
            >
              {page + 2}
            </button>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-yellow-400 cursor-pointer ${
                isActivePlus ? "bg-yellow-400" : ""
              } active:bg-yellow-400`}
              aria-label="Next"
              onClick={handlePlus}
            >
              +
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopRated;
