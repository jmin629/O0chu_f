import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewMovie from "../new/NewMovie 2";
import Suggestion from "../o0chu/Suggestion";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Auth from "../hoc/auth";
import ScrollToTopButton from "../scrolltop/ScrolltoptoButton";
import ScrollToQuestion from "../scrolltop/ScrolltoQuestion";

// import OcheMovie from "./OchuMovie";

function List() {
  const user = useSelector((state) => state.user);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (user !== undefined && user.userData !== undefined) {
      setNickname(user.userData.nickname);
    }
  });

  return (
    <div>
      <Header />
      <div className="listWrap webSize">
        <h5 className="cateTitle">New</h5>
        <NewMovie></NewMovie>
        {user && user.userData && user.userData.isAuth ? <h5 className="cateTitle marT_20">{nickname}님을 위한 영화</h5> : <h5 className="cateTitle marT_20">추천 영화</h5>}
        <Suggestion />
        <div className="scroll-to-div">
          <ScrollToQuestion />
          <ScrollToTopButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auth(List, false);
