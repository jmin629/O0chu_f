import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../config/api";

function StarRatingList({ rating, onStarClick, movie_id }) {
  const maxStars = 5;
  const yellowStars = rating;

  const handleStarClick = (starIndex) => {
    // 클릭한 별의 인덱스를 전달하여 rating을 업데이트
    onStarClick(starIndex + 1);
  };

  return (
    <p className="marT_10">
      {Array.from({ length: maxStars }).map((_, index) => (
        <FaStar className="cuP" key={index} color="#ffc107" size={24} style={{ color: index < yellowStars ? "yellow" : "gray" }}>
          &#9733; {/* 별 이모지 */}
        </FaStar>
      ))}
      <h3 style={{ color: "#fff", textAlign: "center" }}>별점: {rating} / 5</h3>
    </p>
  );
}

export default StarRatingList;
