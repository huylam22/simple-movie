import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { apiKey, fetcher } from "../../config/config";
import MovieCard from "./MovieCard";
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=f9d9b04b7918c3ef2fc42e47d96a6c9d

const MovieList = ({ type = "now_playing" }) => {
  //   const [movies, setMovies] = useState([]);

  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`,
    fetcher
  );

  //   useEffect(() => {
  //     setMovies(data?.results);
  //   }, [data]);
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={"true"}
        spaceBetween={40}
        slidesPerView={"auto"}
        direction={"horizontal"}
      >
        {movies?.length > 0 &&
          movies.map((item, idx) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
