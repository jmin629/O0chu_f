import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../../../footer/Footer";
import { api } from "../../../../config/api";

export default function DeleteUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("이메일 및 비밀번호를 모두 입력해주세요.");
      return;
    } else {
      setMessage("");
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${api}/api/users/mypage/deleteuser`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;
      if (responseMessage === "Does Not Match User") {
        setMessage("이메일이 일치하지 않습니다.");
      } else if (responseMessage === "Current Password Does Not Match") {
        setMessage("현재 비밀번호가 일치하지 않습니다.");
      } else if (responseMessage === "회원 탈퇴 성공") {
        alert("탈퇴가 완료되었습니다, 지금까지 오영추를 이용해주셔서 감사합니다.");
        Cookies.remove("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        navigate("/");
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
          <h3 class="green-text">회원탈퇴</h3>
          <h5 className="marB_40">오영추의 서비스를 더 이상 이용할 수 없게 됩니다.</h5>
          <h5 className="marB_30">( 탈퇴 후 되돌릴 수 없습니다. )</h5>

          <form onSubmit={handleSubmit}>
            <input className="marB_20" type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="marB_20" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            {message && <p className="error-message">{message}</p>}
            <button className="marB_10" type="submit">
              회원탈퇴
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
