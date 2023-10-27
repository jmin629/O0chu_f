import axios from "axios";
import React, { useEffect, useState } from "react";
import Searchitem from "../search/Searchitem";
import Suggestionitem from "./Suggestionitem";
import { useSelector } from "react-redux";
import { api } from "../config/api";

const Suggestion = () => {
  const [list, setlist] = useState([]);
  const [load, setload] = useState(true);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== undefined && user.userData !== undefined) {
      const headers = {
        useremail: user.userData.email,
      };

      axios
        .get(`${api}/api/movie/newsuggestion`, { headers })
        .then((res) => {
          setlist(res.data);
          setload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return <div>{load ? <div className="loadBox">로그인 후 이용 가능한 서비스 입니다.</div> : <Suggestionitem item={list} />}</div>;
};

export default Suggestion;
