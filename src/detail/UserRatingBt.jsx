import React, { useState } from "react";
import StarRating from "../etc/star/RatingStar";
import { useSelector } from "react-redux";
import axios from "axios";

const UserRatingBt = ({ user_id, movie_id, korean_title }) => {
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.user);

  const onClick = () => {
    let body = {
      user_email: user_id,
      movie_id: movie_id,
      score: rating,
    };

    axios
      .post("/api/Rating", body)
      .then((res) => {
        if (res.data) {
          alert("별점이 등록되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .post("http://52.79.68.204:5001/recommend", body)
    //   .then((res) => {
    //     if (res.data) {
    //       console.log(res.data);
    //       alert("추천 영화가 등록되었습니다.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    console.log(body);
  };

  return (
    <div>
      <StarRating
        onRatingChange={(newRating) => {
          setRating(newRating);
        }}
      />
      <button className="btn" onClick={onClick}>
        별점주기
      </button>
    </div>
  );
};

export default UserRatingBt;
