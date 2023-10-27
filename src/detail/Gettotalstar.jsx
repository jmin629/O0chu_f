import React, { useEffect, useState } from "react";
import StarRating2 from "./Stardisplay";
import axios from "axios";
import { api } from "../config/api";
import StarRatingList from "./Stardisplaylist";

const Gettotalstar = ({ movie_id }) => {
  const [initialRating, setInitialRating] = useState(0); // 초기 별점
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    axios
      .post(`${api}/api/total/Rating`, {
        movie_id: movie_id,
      })
      .then((res) => {
        // console.log("movie_id : " + movie_id + " = " + res.data);
        var avg = 0;
        var sum = 0;
        if (res.data.length == 0) {
          avg = 0;
        } else {
          for (var i = 0; i < res.data.length; i++) {
            sum += res.data[i];
          }
          avg = Math.round(sum / res.data.length);
        }
        // console.log(avg);
        setInitialRating(avg);
        setRating(avg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id]);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  return <p>{rating === 0 ? <h3 style={{ color: "#fff", textAlign: "center" }}>등록 된 별점 없음</h3> : <StarRatingList rating={rating} onStarClick={handleStarClick} movie_id={movie_id} />}</p>;
};

export default Gettotalstar;
