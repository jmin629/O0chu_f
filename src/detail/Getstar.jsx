import React, { useEffect, useState } from "react";
import StarRating2 from "./Stardisplay";
import axios from "axios";
import { api } from "../config/api";

const Getstar = ({ movie_id, user_email }) => {
  const [initialRating, setInitialRating] = useState(0); // 초기 별점
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    axios
      .post(`${api}/api/user/Rating`, { movie_id: movie_id, user_email: user_email })
      .then((res) => {
        setInitialRating(res.data);
        setRating(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id, user_email]);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <StarRating2 rating={rating} onStarClick={handleStarClick} movie_id={movie_id} user_id={user_email} />
    </div>
  );
};

export default Getstar;
