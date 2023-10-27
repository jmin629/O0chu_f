import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../config/api";
import { useNavigate } from "react-router-dom";

const Addwish = ({ movie_id }) => {
  const [isSolidStar, setIsSolidStar] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.userData) {
      axios.get(`${api}/api/wish/status/?movie_id=${movie_id}&user_email=${user.userData.email}`).then((res) => {
        if (res.data[0] === "Y") {
          setIsSolidStar(true);
        } else {
          setIsSolidStar(false);
        }
      });
    }
  }, [movie_id]);

  const handleStarClick = () => {
    try {
      let wish = "";

      if (isSolidStar) {
        wish = "N";
        alert("찜 목록에서 제외되었습니다.");
      } else {
        wish = "Y";
        alert("찜 목록에 추가되었습니다.");
      }

      setIsSolidStar(!isSolidStar);

      console.log("찜 목록: ", isSolidStar);

      let body = {
        wish: wish,
        movie_id: movie_id,
        user_email: user.userData.email,
      };

      axios
        .post(`${api}/api/wish/addwish`, body)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("요청 중 오류 발생: ", error);
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={isSolidStar ? solidStar : regularStar}
        size="sm"
        style={{
          color: isSolidStar ? "#ffea00" : "#000000",
          cursor: "pointer", // Add a pointer cursor for better UX
        }}
        onClick={handleStarClick}
      />
    </>
  );
};

export default Addwish;
