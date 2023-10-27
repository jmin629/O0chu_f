import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Footer from "../../../../footer/Footer";
import { api } from "../../../../config/api";

export default function NicknameChange(props) {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${api}/api/users/mypage/nickname`,
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;

      if (responseMessage === "Invalid Nickname Pattern") {
        setMessage("1글자 이상 9글자 미만으로 입력해주세요.");
      } else if (responseMessage === "Nickname already in use") {
        setMessage("이미 존재하는 닉네임입니다.");
      } else if (responseMessage === "Success") {
        alert("변경이 완료되었습니다, 다시 로그인 해주세요.");
        Cookies.remove("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="head">
        <div className="header">
          <img src="/image/logo2.png" alt="로고" />
        </div>
      </div>
      <div className="passBoxW">
        <div className="passBox">
          <h3 class="green-text">닉네임 변경</h3>
          <h5 className="marB_30">자신을 표현할 닉네임을 변경해보세요.</h5>

          <form onSubmit={handleSubmit}>
            <input className="marB_20" type="nickname" placeholder="변경할 닉네임" value={nickname} onChange={handleNicknameChange} />
            {message && <p className="error-message">{message}</p>}
            <button class="marB_10" type="submit">
              변경
            </button>
            <button
              onClick={() => {
                navigate("/mypage");
              }}
            >
              이전
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
