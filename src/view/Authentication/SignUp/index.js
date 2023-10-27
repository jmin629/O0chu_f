import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Box, Button, Card, TextField, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment } from "@mui/material";
import { NextClickApi, signUpApi } from "../../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../config/api";

export default function SignUp(props) {
  // 회원가입 폼 입력값과 오류 상태 변수
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [preference_1, setPreference_1] = useState("0");
  const [preference_2, setPreference_2] = useState("0");
  const [preference_3, setPreference_3] = useState("0");
  const [showPosterDialog, setShowPosterDialog] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNickNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState(""); // 연령대 에러 상태 변수 추가
  const [posterError, setPosterError] = useState("");
  const [preference1Error, setPreference1Error] = useState("");
  const [preference2Error, setPreference2Error] = useState("");
  const [preference3Error, setPreference3Error] = useState("");

  {
    /*............................................................................................*/
  }
  // 검색어 입력 및 검색 결과 상태 변수 추가
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsDialog, setShowSearchResultsDialog] = useState(false);

  // 검색 모달을 띄우기 위한 상태 변수 추가
  const [showSearchModal, setShowSearchModal] = useState(false);

  const data = {
    email,
    password,
    passwordCheck,
    name,
    nickname,
    gender,
    age: selectedAge,
    movieId: selectedMovie.movie_id,
    preference_1,
    preference_2,
    preference_3,
  };

  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  // 엔터로 검색가능하게 하기
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleMovieSearch();
  };

  const handleMovieSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`${api}/api/movie/search/${searchTerm}`);
        console.log(`Requesting: /movie/search/${searchTerm}`);
        if (response.data.length > 0) {
          setSearchResults(response.data);
          console.log("Search Results:", response.data);
          setShowSearchResultsDialog(true);
        } else {
          setSearchResults([]);
          alert("검색 결과가 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching search results", error);
        alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  const handleMovieSelect = (movieId) => {
    const selected = searchResults.find((movie) => movie.movie_id === movieId);
    console.log("Selected Movie ID:", selected ? selected.movie_id : "Not found");
    console.log("Selected Movie:", selected);
    setSelectedMovie({
      movie_id: selected.movie_id,
      kr_title: selected.kr_title,
      poster_path: selected.poster_path,
    });
    setSearchTerm("");
    setShowSearchResultsDialog(false);
    setShowSearchModal(false);
    setPosterError("");

    // 영화가 선택되었을 때 알림창 띄우기
    window.alert(`선택된 영화 : ${selected.kr_title}`);
  };

  {
    /*............................................................................................*/
  }

  // 회원가입 단계를 추적하기 위한 상태 변수
  const [currentStep, setCurrentStep] = useState(1);

  const { setAuthView } = props;

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 다른 페이지로 이동
    navigate("/boardmain/SignIn");
  };

  useEffect(() => {
    setGender("0");
    setSelectedAge("0");
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [selectedPreferences, setSelectedPreferences] = useState(["0", "0", "0"]);

  const handlePreferenceSelect = (preference, index) => {
    const updatedSelectedPreferences = [...selectedPreferences];
    updatedSelectedPreferences[index] = preference;
    setSelectedPreferences(updatedSelectedPreferences);
  };

  const validateEmail = async () => {
    const nextClickResponse = await NextClickApi(data);
    // 이메일 유효성 검사를 수행
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setEmailError("이메일 주소를 입력해주세요.");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식을 입력해주세요.");
      return false;
    } else if (nextClickResponse.message === "Email already in use") {
      setEmailError("중복된 이메일입니다.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validateNickname = async () => {
    const nextClickResponse = await NextClickApi(data);

    // 닉네임 유효성 검사를 수행
    const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/;
    // 닉네임 유효성 검사
    if (!nickname) {
      setNickNameError("닉네임을 입력해주세요.");
      return false;
    } else if (!nicknameRegex.test(nickname)) {
      setNickNameError("1글자 이상 9글자 미만으로 입력해주세요.");
      return false;
    } else if (nextClickResponse.message === "Nickname already in use") {
      setNickNameError("중복된 닉네임입니다.");
      return false;
    } else {
      setNickNameError("");
      return true;
    }
  };

  const validateName = () => {
    // 이름 유효성 검사를 수행
    const nameRegex = /^[ㄱ-ㅎ|가-힣].{1,4}$/;
    // 이름 유효성 검사
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return false;
    } else if (!nameRegex.test(name) || name.length < 1 || name.length >= 5) {
      setNameError("1글자 이상 5글자 미만 한글만 입력 가능합니다.");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validatePassword = () => {
    // 비밀번호 유효성 검사를 수행
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // 비밀번호 유효성 검사
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("비밀번호는 최소 8자 이상, 영문자와 숫자, 특수 문자를 포함해야 합니다.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validatePasswordMatch = () => {
    // 비밀번호 일치 여부 검사
    if (!password) {
      setPasswordMatchError("비밀번호를 입력해주세요.");
      return false;
    } else if (password !== passwordCheck) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      setPasswordMatchError("");
      return true;
    }
  };

  const validateGender = () => {
    if (gender === "0") {
      setGenderError("성별을 선택해주세요."); // Set the error message
      return false;
    } else {
      setGenderError(""); // Clear the error message if gender is selected
      return true;
    }
  };

  const validateAge = () => {
    if (selectedAge === "0") {
      setAgeError("연령대를 선택해주세요."); // Set the error message
      return false;
    } else {
      setAgeError(""); // Clear the error message if age is selected
      return true;
    }
  };

  // 회원가입 두번째 단계로 이동
  const handleNextClick = async () => {
    const isValidEmail = await validateEmail();
    const isValidPassword = validatePassword();
    const isValidPasswordMatch = validatePasswordMatch();
    const isValidName = validateName();
    const isValidNickname = await validateNickname();
    const isValidGender = validateGender();
    const isValidAge = validateAge();

    // 모든 필수 정보가 올바르게 입력되었을 때 다음 단계로 이동
    if (currentStep === 1 && isValidEmail && isValidPassword && isValidPasswordMatch && isValidName && isValidNickname && isValidGender && isValidAge) {
      setCurrentStep(2);
    }
  };

  const validateSelectedMovie = async () => {
    if (!selectedMovie) {
      setPosterError("영화를 선택하세요.");
      return false;
    } else {
      setPosterError("");
      return true;
    }
  };

  const validatePreference1 = async () => {
    if (preference_1 === "0") {
      setPreference1Error("영화를 볼 때 우선적으로 생각하는 것 1순위를 선택하세요.");
      return false;
    } else {
      setPreference1Error(""); // 선택이 유효한 경우 에러 메시지 초기화
      return true;
    }
  };
  const validatePreference2 = async () => {
    // 2순위 장르 선택
    if (preference_2 === "0") {
      setPreference2Error("영화를 볼 때 우선적으로 생각하는 것 2순위를 선택하세요.");
      return false;
    } else {
      setPreference2Error(""); // 선택이 유효한 경우 에러 메시지 초기화
      return true;
    }
  };
  const validatePreference3 = async () => {
    // 3순위 장르 선택
    if (preference_3 === "0") {
      setPreference3Error("영화를 볼 때 우선적으로 생각하는 것 3순위를 선택하세요.");
      return false;
    } else {
      setPreference3Error(""); // 선택이 유효한 경우 에러 메시지 초기화
      return true;
    }
  };

  const signUpHandler = async () => {
    const isValidMovie = await validateSelectedMovie();
    const isValidPreference1 = await validatePreference1();
    const isValidPreference2 = await validatePreference2();
    const isValidPreference3 = await validatePreference3();

    // 로그 추가
    console.log("posterError:", posterError);
    console.log("preference1Error:", preference1Error);
    console.log("preference2Error:", preference2Error);
    console.log("preference3Error:", preference3Error);

    // 모든 검증을 통과하면 회원가입을 시도
    if (isValidMovie && isValidPreference1 && isValidPreference2 && isValidPreference3) {
      // 로그 추가
      console.log("모든 유효성 검사 통과");

      // 회원가입 API 호출
      const signUpResponse = await signUpApi(data);

      console.log(signUpResponse);

      if (signUpResponse === false) {
        return;
      } else {
        alert("회원가입에 성공했습니다.");
        axios.post("http://52.79.68.204:5001/userjoin", { user_email: email }).then((res) => {
          console.log(res);
        });
        navigate("/");
      }
    }
  };

  const handlePrevClick = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const openPosterDialog = () => {
    setShowPosterDialog(true);
  };

  const handlePosterClick = (posterId) => {
    setSelectedMovie(posterId);
    closePosterDialog();
  };

  const isMovieSelected = selectedMovie !== "";

  const closePosterDialog = () => {
    setShowPosterDialog(false);
  };

  const [isPosterVisible, setIsPosterVisible] = useState(false);

  const handlePosterClose = () => {
    setShowPosterDialog(false); // 다이얼로그만 닫음
  };

  const handleTogglePoster = (movieId) => {
    setSelectedMovie(movieId);
    setIsPosterVisible(true);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Wrap">
      <div className="form-wrapper">
        <h2>회원가입</h2>
        <Box>
          {currentStep === 1 && (
            <div>
              <Typography variant="subtitle1" fontSize="small"></Typography>
              <TextField
                fullWidth
                label="이메일주소"
                type="email"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="yourEmail@email.com"
                value={email}
                sx={{ mb: 2 }}
              />
              {emailError && (
                <Typography color="error" fontSize="small">
                  {emailError}
                </Typography>
              )}
              <TextField
                fullWidth
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                value={password}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <Typography color="error" fontSize="small">
                  {passwordError}
                </Typography>
              )}
              <TextField
                fullWidth
                label="비밀번호 확인"
                type={showPassword ? "text" : "password"}
                variant="standard"
                onChange={(e) => setPasswordCheck(e.target.value)}
                onBlur={validatePasswordMatch}
                value={passwordCheck}
                sx={{ mb: 2 }}
              />
              {passwordMatchError && (
                <Typography color="error" fontSize="small">
                  {passwordMatchError}
                </Typography>
              )}
              <TextField fullWidth label="이름" variant="standard" onChange={(e) => setName(e.target.value)} onBlur={validateName} value={name} sx={{ mb: 2 }} />
              {nameError && (
                <Typography color="error" fontSize="small">
                  {nameError}
                </Typography>
              )}
              <TextField fullWidth label="닉네임" variant="standard" onChange={(e) => setNickName(e.target.value)} onBlur={validateNickname} value={nickname} sx={{ mb: 2 }} />
              {nicknameError && (
                <Typography color="error" fontSize="small">
                  {nicknameError}
                </Typography>
              )}
              <Typography variant="subtitle1" fontSize="small">
                성별
              </Typography>
              <Select
                fullWidth
                variant="standard"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setGenderError(""); // 선택할 때 에러 메시지 초기화
                }}
                onBlur={validateGender}
                sx={{ mb: 2 }}
              >
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="1">남자</MenuItem>
                <MenuItem value="2">여자</MenuItem>
              </Select>
              {genderError && (
                <Typography color="error" fontSize="small">
                  {genderError}
                </Typography>
              )}

              <Typography variant="subtitle1" fontSize="small">
                연령대
              </Typography>
              <Select
                fullWidth
                variant="standard"
                value={selectedAge}
                onChange={(e) => {
                  setSelectedAge(e.target.value);
                  setAgeError(""); // 선택할 때 에러 메시지 초기화
                }}
                onBlur={validateAge}
                sx={{ mb: 2 }}
              >
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="10">10대</MenuItem>
                <MenuItem value="20">20대</MenuItem>
                <MenuItem value="30">30대</MenuItem>
                <MenuItem value="40">40대</MenuItem>
                <MenuItem value="50">50대 이상</MenuItem>
              </Select>
              {ageError && (
                <Typography color="error" fontSize="small">
                  {ageError}
                </Typography>
              )}
              <a href="#" class="myButton" type="submit" onClick={handleNextClick}>
                다음
              </a>
            </div>
          )}

          {/*............................................................................................*/}
          {currentStep === 2 && (
            <div>
              <Button onClick={openSearchModal} variant="outlined" sx={{ mb: 1 }}>
                감명 깊게 본 영화를 선택하세요
              </Button>

              {/* 검색을 위한 모달 추가 */}
              <Dialog open={showSearchModal} onClose={closeSearchModal} maxWidth="lg" fullWidth>
                <DialogTitle>감명 깊게 본 영화</DialogTitle>
                <DialogContent>
                  <form onSubmit={handleFormSubmit} style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      fullWidth
                      label="영화 이름을 입력하세요."
                      variant="standard"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                      placeholder="영화 이름을 입력하세요."
                      sx={{ flexGrow: 1, mr: 1, mb: 2 }}
                    />
                    <Button type="submit" variant="outlined">
                      검색
                    </Button>
                  </form>

                  {searchResults.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "1em" }}>
                      {searchResults.map((movie) => (
                        <div key={movie.movie_id}>
                          <img src={movie.poster_path} alt={movie.kr_title} style={{ width: "240px", maxHeight: "300px" }} onClick={() => handleMovieSelect(movie.movie_id)} />
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeSearchModal} color="primary">
                    닫기
                  </Button>
                </DialogActions>
              </Dialog>

              {/* 포스터 선택 관련 에러 메시지 */}
              {posterError && (
                <Typography color="error" fontSize="small">
                  {posterError}
                </Typography>
              )}

              <div>
                {/* "포스터 보기" 버튼 */}
                <Button onClick={openModal} variant="outlined" sx={{ mb: 5 }}>
                  {isPosterVisible ? "포스터 보기" : "포스터 보기 (+)"}
                </Button>

                {/* 선택한 영화를 확인하는 모달 */}
                <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth style={{ width: "auto", padding: "20px 50px" }}>
                  <h4 style={{ textAlign: "center", fontSize: "25px", paddingTop: "10px" }}>{selectedMovie ? selectedMovie.kr_title : ""}</h4>
                  <DialogContent style={{ textAlign: "center" }}>
                    <img src={selectedMovie ? selectedMovie.poster_path : ""} alt="선택한 영화 포스터" style={{ width: "300px" }} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeModal} color="primary">
                      {" "}
                      확인
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/*............................................................................................*/}

              <Typography variant="subtitle1" fontSize="small">
                영화 시청 우선 순위 첫번째
              </Typography>
              <Select
                fullWidth
                variant="standard"
                value={preference_1}
                onChange={(e) => {
                  setPreference_1(e.target.value);
                }}
                sx={{ mb: 6 }}
                disabled={!isMovieSelected}
                onBlur={validatePreference1} // 포커스 아웃할 때 검증
              >
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference1Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3, mb: 3 }}>
                  {preference1Error}
                </Typography>
              )}

              <Typography variant="subtitle1" fontSize="small">
                영화 시청 우선 순위 두번째
              </Typography>
              <Select fullWidth variant="standard" value={preference_2} onChange={(e) => setPreference_2(e.target.value)} disabled={!isMovieSelected} sx={{ mb: 6 }} onBlur={validatePreference2}>
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference2Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3, mb: 3 }}>
                  {preference2Error}
                </Typography>
              )}
              <Typography variant="subtitle1" fontSize="small">
                영화 시청 우선 순위 세번째
              </Typography>
              <Select fullWidth variant="standard" value={preference_3} onChange={(e) => setPreference_3(e.target.value)} disabled={!isMovieSelected} sx={{ mb: 5 }} onBlur={validatePreference3}>
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference3Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3 }}>
                  {preference3Error}
                </Typography>
              )}
              <Box display="flex" justifyContent="space-between">
                <a href="#" class="myButton" type="submit" onClick={handlePrevClick}>
                  이전
                </a>
                <a href="#" class="myButton" type="submit" onClick={signUpHandler}>
                  회원가입
                </a>
              </Box>
            </div>
          )}
        </Box>
        <Box mt="2em" display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body2">
            이미 계정이 있으신가요?
            <span
              onClick={handleLoginClick}
              style={{
                color: "#00c03f",
                cursor: "pointer",
              }}
            >
              로그인
            </span>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
