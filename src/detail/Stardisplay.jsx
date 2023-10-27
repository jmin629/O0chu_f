import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../config/api";

function StarRating2({ rating, onStarClick, user_id, movie_id }) {
  const maxStars = 5;
  const yellowStars = rating;

  const handleStarClick = (starIndex) => {
    // 클릭한 별의 인덱스를 전달하여 rating을 업데이트
    onStarClick(starIndex + 1);
  };

  const onClick = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
    } else {
      let body = {
        user_email: user_id,
        movie_id: movie_id,
        score: rating,
      };

      axios
        .post(`${api}/api/Rating`, body)
        .then((res) => {
          if (res.data) {
            alert("별점이 등록되었습니다.");
            axios
              .post("http://52.79.68.204:5001/recommend", body)
              .then((res) => {
                if (res.data) {
                  alert("추천 영화가 등록되었습니다.");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {Array.from({ length: maxStars }).map((_, index) => (
        <FaStar className="cuP" key={index} color="#ffc107" size={24} onClick={() => handleStarClick(index)} style={{ color: index < yellowStars ? "yellow" : "gray" }}>
          &#9733; {/* 별 이모지 */}
        </FaStar>
      ))}
      <p className="marL_10">별점: {rating} / 5</p>
      <button className="btn" onClick={onClick}>
        별점주기
      </button>
    </div>
  );
}

export default StarRating2;
