import { FaStar, FaStarHalf } from "react-icons/fa";
import React, { useState } from "react";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (clickedIndex) => {
    // 이미 클릭한 별을 다시 클릭하면 0으로 설정
    if (clickedIndex === Math.floor(rating) && !Number.isInteger(rating)) {
      setRating(0);
    } else {
      // 클릭한 별의 점수를 설정
      setRating(clickedIndex + 1);
    }

    onRatingChange(clickedIndex + 1);
  };
  console.log(rating);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#ffc107" size={24} />);
      } else if (i === Math.floor(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalf key={i} color="#ffc107" size={24} />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" size={24} />);
      }
    }
    return stars;
  };

  return (
    <div className="star">
      <div>
        {renderStars().map((star, index) => (
          <span key={index} onClick={() => handleStarClick(index)} style={{ cursor: "pointer" }}>
            {star}
          </span>
        ))}
      </div>
      <p className="marL_10">별점: {rating} / 5</p>
    </div>
  );
};

export default StarRating;
