import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Newlist from "./Newlist";
import Loading from "../loading/Loading";
import { api } from "../config/api";

function NewMovie({ movie, id }) {
  const [newlist, setnewlist] = useState([]);
  const [load, setloda] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${api}/api/newList`)
      .then((res) => {
        const filteredList = res.data.filter((item) => item.delete_yn === 'N');
        setnewlist(filteredList);
        setloda(false);
      })
      .catch((error) => {
        alert("arror!");
      });
  }, []);

  return load ? <Loading /> : <Newlist movie={newlist} />;
}

export default NewMovie;
