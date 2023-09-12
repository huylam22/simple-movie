import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config/config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=f9d9b04b7918c3ef2fc42e47d96a6c9d
import PropType from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type = "now_playing" }) => {
  const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher);

  const movies = data?.results || [];

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper
            grabCursor={"true"}
            spaceBetween={40}
            slidesPerView={"auto"}
            direction={"horizontal"}
          >
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
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
      )}
    </div>
  );
};
MovieList.propTypes = {
  type: PropType.string.isRequired,
};

function FallbackComponent({ error }) {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component: {error.message}
    </p>
  );
}
export default withErrorBoundary(MovieList, {
  FallbackComponent: FallbackComponent,
});
