import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const BannerItem = ({ item }) => {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)] ounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
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
        <Button onClick={handleNavigate}>Watch Now</Button>
      </div>
    </div>
  );
};

export default BannerItem;
