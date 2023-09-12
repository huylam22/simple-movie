import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config/config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "components/movie/MovieCard";
// import PropTypes from "prop-types";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative mb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      <div className="flex items-center justify-center mb-10 gap-x-5">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
      </div>
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <div className="page-container">
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
        {/* <MovieCredits></MovieCredits>
        <MovieVideos></MovieVideos>
        <MovieSimilar></MovieSimilar> */}
      </div>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="mb-10 text-2xl text-center">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-3xl font-medium"> {item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div key={item.id} className="">
                <h3 className="inline-block p-3 mx-auto mb-5 text-xl font-medium text-white rounded-full bg-secondary">
                  {item.name}
                </h3>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="1558"
                    height="876"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Youtube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar") {
      return (
        <div className="movie-list">
          <h3 className="mb-10 text-3xl font-medium"> Similar Movies</h3>
          <Swiper
            grabCursor={"true"}
            spaceBetween={40}
            slidesPerView={"auto"}
            direction={"horizontal"}
          >
            {results?.length > 0 &&
              results.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      );
    }
  }
  return null;
}

/** 
 * Chia Components
function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="mb-10 text-2xl text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-3xl font-medium"> {item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "videos"),
    fetcher
  );
  if (!data) return null;

  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className="">
            <h3 className="inline-block p-3 mx-auto mb-5 text-xl font-medium text-white rounded-full bg-secondary">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="1558"
                height="876"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Youtube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// <iframe width="1558" height="876" src="https://www.youtube.com/embed/lB3XEVKzleI" title="CHƠI THỬ GAME GIẢ LẬP LÀM LOÀI NGƯỜI =))))))) Đỉnh cao simulator là đây !!! - Human Simulator" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  console.log(results);
  if (!results || results.length <= 0) return null;
  return (
    <div className="movie-list">
      <h3 className="mb-10 text-3xl font-medium"> Similar Movies</h3>
      <Swiper
        grabCursor={"true"}
        spaceBetween={40}
        slidesPerView={"auto"}
        direction={"horizontal"}
      >
        {results?.length > 0 &&
          results.map((item, idx) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
 */
export default MovieDetailsPage;
