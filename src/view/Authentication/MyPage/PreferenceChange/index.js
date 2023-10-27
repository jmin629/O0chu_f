import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetUserInfo } from "../../../../api";
import Footer from "../../../../footer/Footer";
import { api } from "../../../../config/api";

export default function PreferenceChange(props) {
  const [preference_1, setPreference_1] = useState("0");
  const [preference_2, setPreference_2] = useState("0");
  const [preference_3, setPreference_3] = useState("0");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [preference1Error, setPreference1Error] = useState("");
  const [preference2Error, setPreference2Error] = useState("");
  const [preference3Error, setPreference3Error] = useState("");

  const navigate = useNavigate();

  const handlePreferenceChange = (e) => {
    if (e.target.name === "preference_1") {
      setPreference_1(e.target.value);
    } else if (e.target.name === "preference_2") {
      setPreference_2(e.target.value);
    } else if (e.target.name === "preference_3") {
      setPreference_3(e.target.value);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = Cookies.get("token");
      const response = await GetUserInfo(token);

      setUserInfo(response.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (preference_1 === "0") {
      setPreference1Error("선호도 1순위를 선택하세요.");
      return; // 에러가 발생하면 폼 제출을 중지합니다.
    } else {
      setPreference1Error(""); // 에러 메시지를 지웁니다.
    }

    if (preference_2 === "0") {
      setPreference2Error("선호도 2순위를 선택하세요.");
      return;
    } else {
      setPreference2Error("");
    }

    if (preference_3 === "0") {
      setPreference3Error("선호도 3순위를 선택하세요.");
      return;
    } else {
      setPreference3Error("");
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${api}/api/users/mypage/preference`,
        {
          preference_1,
          preference_2,
          preference_3,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;

      if (responseMessage === "Invalid Preference Pattern") {
        setMessage("선호도 패턴이 잘못되었습니다.");
      } else if (responseMessage === "Success") {
        alert("변경이 완료되었습니다, 다시 로그인 해주세요.");
        Cookies.remove("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        navigate("/login");
      } else {
        setMessage("알 수 없는 오류 발생");
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
          <h3 class="green-text">선호도 변경</h3>
          <h5 className="marB_40">변경할 선호도 순위를 정해주세요.</h5>
          <h5 className="marB_30">( 기존 사용자가 선택한 선호도의 경우 녹색으로 표시 )</h5>
          {userInfo && (
            <form onSubmit={handleSubmit} className="uuu">
              <div className="preference-container">
                <div className="preference-item">
                  <div className="label-wrapper">
                    <label className="preference-label" htmlFor="preference_1">
                      1순위{" "}
                    </label>
                    <Select name="preference_1" value={preference_1} onChange={handlePreferenceChange} style={{ width: "100px" }}>
                      <MenuItem value="0">{userInfo.preference_1 === "1" ? "감독" : userInfo.preference_1 === "2" ? "장르" : "배우"}</MenuItem>
                      <MenuItem value="1">감독</MenuItem>
                      <MenuItem value="2">장르</MenuItem>
                      <MenuItem value="3">배우</MenuItem>
                    </Select>
                    {preference1Error && <p className="error-message">{preference1Error}</p>}
                  </div>
                </div>
                <div className="preference-item">
                  <div className="label-wrapper">
                    <label className="preference-label" htmlFor="preference_2">
                      2순위{" "}
                    </label>
                    <Select name="preference_2" value={preference_2} onChange={handlePreferenceChange} style={{ width: "100px" }}>
                      <MenuItem value="0">{userInfo.preference_2 === "1" ? "감독" : userInfo.preference_2 === "2" ? "장르" : "배우"}</MenuItem>
                      <MenuItem value="1">감독</MenuItem>
                      <MenuItem value="2">장르</MenuItem>
                      <MenuItem value="3">배우</MenuItem>
                    </Select>
                    {preference2Error && <p className="error-message">{preference2Error}</p>}
                  </div>
                </div>
                <div className="preference-item">
                  <div className="label-wrapper">
                    <label className="preference-label" htmlFor="preference_3">
                      3순위{" "}
                    </label>
                    <Select name="preference_3" value={preference_3} onChange={handlePreferenceChange} style={{ width: "100px" }}>
                      <MenuItem value="0">{userInfo.preference_3 === "1" ? "감독" : userInfo.preference_3 === "2" ? "장르" : "배우"}</MenuItem>
                      <MenuItem value="1">감독</MenuItem>
                      <MenuItem value="2">장르</MenuItem>
                      <MenuItem value="3">배우</MenuItem>
                    </Select>
                    {preference3Error && <p className="error-message">{preference3Error}</p>}
                  </div>
                </div>
              </div>
              <button className="marB_10" type="submit">
                변경
              </button>
              <button onClick={() => navigate("/mypage")}>이전</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
