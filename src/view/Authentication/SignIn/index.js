import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../store";
import { signInApi } from "../../../api";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();
  const { setUser } = useUserStore();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { setAuthView } = props;
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to the signup page
    navigate("/register");
  };

  const signInHandler = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    if (email.length === 0 || password.length === 0) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const signInResponse = await signInApi(data);

      if (!signInResponse) {
        alert("로그인에 실패했습니다.");
        return;
      }

      if (signInResponse.result) {
        const { user1 } = signInResponse;

        // 로그인 성공 메시지를 표시하거나 다른 동작을 수행할 수 있습니다.
        navigate("/"); // Redirect to the home page
      } else {
        alert("이메일 혹은 패스워드를 잘못 입력하셨거나 등록되지 않은 이메일입니다.");
      }

      const { token, exprTime, user } = signInResponse.data;
      const expires = new Date();
      expires.setMilliseconds(expires.getMilliseconds() + exprTime);

      console.log(exprTime);

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expires);
      // sessionStorage.setItem("token", token);

      setCookies("token", token, { expires });
      setUser(user);
    } catch (error) {
      console.error(error);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="Wrap">
      <div className="form-wrapper">
        <h2>로그인</h2>
        <form id="login-form" onSubmit={signInHandler}>
          <input type="text" name="userName" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" name="userPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Typography variant="body2">
            오영추엔 처음 이신가요?
            <span
              onClick={handleLoginClick}
              style={{
                fontFamily: "sans-serif",
                color: "#00c03f",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              회원가입
            </span>
          </Typography>
          <button type="submit" value="Login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
