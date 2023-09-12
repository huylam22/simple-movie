import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import { SwiperSlide, Swiper } from "swiper/react";
import BannerItem from "./BannerItem";

const Banner = ({ type = "upcoming" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=f9d9b04b7918c3ef2fc42e47d96a6c9d`,
    fetcher
  );
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-10 overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item, idx) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
