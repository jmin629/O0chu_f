import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserInfo } from "../../../api";
import Cookies from "js-cookie";
import Footer from "../../../footer/Footer";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    // Axios 요청을 async 함수로 감싸서 사용
    const fetchData = async () => {
      try {
        const response = await GetUserInfo(token); // GetUserInfo 함수를 호출
        // API 응답 데이터 확인

        // API 응답 데이터에서 사용자 정보 설정
        setUserInfo(response.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // userInfo가 로드되었을 때 데이터를 출력
  if (userInfo) {
    return (
      <div>
        <div className="head">
          <div className="header">
            <Link to="/">
              <img src="/image/logo2.png" alt="로고" />
            </Link>
          </div>
        </div>
        <div id="mypage">
          <div className="info_box">
            <h5>마이 페이지</h5>
            <ul>
              <li className="col_ff">내 프로필</li>
              <li>
                <span className="marR_30 fon_bol">이름</span>
                <span>{userInfo.name}</span>
              </li>
              <li className="fl">
                <p>
                  <span className="marR_30 fon_bol">닉네임</span>
                  <span>{userInfo.nickname}</span>
                </p>
                <button>
                  <Link to="/nicknamechange">변경</Link>
                </button>
              </li>
              <li>
                <span className="marR_30 fon_bol">이메일</span>
                <span>{userInfo.email}</span>
              </li>
              <li className="fls">
                <p>
                  <span className="marR_30 fon_bol">성별</span>
                  <span>{userInfo.gender === "1" ? "남성" : "여성"}</span>
                </p>
                <p>
                  <span className="marR_30 fon_bol">연령대</span>
                  <span>{parseInt(userInfo.age) + "대"}</span>
                </p>
              </li>
            </ul>
            <ul>
              <li className="col_ff">내 정보수정</li>
              <li className="fl">
                <p>
                  <span className="marR_30 fon_bol">비밀번호</span>
                </p>
                <button>
                  <Link to="/passwordchange">변경</Link>
                </button>
              </li>
              <li className="fl">
                <p>
                  <span className="marR_30 fon_bol">선호도</span>
                </p>
                <button>
                  <Link to="/preferencechagne">변경</Link>
                </button>
              </li>
              <li className="fl">
                <p>
                  <span className="marR_30 fon_bol">회원탈퇴</span>
                </p>
                <button>
                  <Link to="/deleteuser">탈퇴하기</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  // 데이터 로딩 중일 때 나타낼 내용
  return <div></div>;
}

export default MyPage;
