import React from "react";
import Moviedetailinfo from "./Moviedetailinfo";

function MovieInfo({ onPlay, movie }) {
  return (
    <div>
      <Moviedetailinfo movied={movie} />
    </div>
  );
}

export default MovieInfo;
