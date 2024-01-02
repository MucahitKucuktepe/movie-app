import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import MovieDetail from "../pages/MovieDetail";
import TrendingMovies from "../pages/TrendingMovies";
import TopRated from "../pages/TopRated";
import Popular from "../pages/Popular";
import NowPlaying from "../pages/NowPlaying";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trending" element={<TrendingMovies />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/now" element={<NowPlaying />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
