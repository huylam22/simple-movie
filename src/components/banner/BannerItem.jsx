import React from "react";

const BannerItem = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item;

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)] ounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="rounded-lg w-full h-full object-cover"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-3">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
        </div>
        <button className="px-6 py-3 bg-primary rounded-md text-white font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
