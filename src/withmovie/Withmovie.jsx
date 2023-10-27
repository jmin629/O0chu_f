import axios from "axios";
import React, { useEffect, useState } from "react";
import NewMovie from "../new/NewMovie 2";
import Loading from "../loading/Loading";
import Newlist from "../new/Newlist";
import { api } from "../config/api";

const Withmovie = ({ movie_id }) => {
  const [withmovie, setwithmovie] = useState([]);
  const [load, setload] = useState(true);
  useEffect(() => {
    axios
      .get(`${api}/api/movie/withmovie/${movie_id}`)
      .then((res) => {
        setwithmovie(res.data);
        setload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id]);
  return load ? <Loading /> : <Newlist movie={withmovie} />;
};

export default Withmovie;
