import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const token = Cookies.get("token"); // 수정: get 메서드 사용

    const token2 = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (token2 && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > tokenExpiration) {
        // 유효 기간이 만료된 토큰을 삭제
        localStorage.clear();
        alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
        window.location.reload();
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }

    const headers = token2 ? { Authorization: `Bearer ${token2}` } : { Authorization: `a` }; // 토큰이 있는 경우와 없는 경우에 따라 다른 헤더 설정

    useEffect(() => {
      dispatch(auth({ headers })).then((res) => {
        if (!res.payload.isAuth && option) {
          alert("로그인이 필요합니다.");
          Navigate("/login");
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
