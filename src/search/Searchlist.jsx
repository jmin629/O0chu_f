import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Searchitem from "./Searchitem";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";
import { api } from "../config/api";

const Searchlist = (props) => {
  const a = useParams();

  const [list, setlist] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get(`${api}/api/movie/search/${a.search}`).then((res) => {
      const filteredList = res.data.filter((movie) => movie.delete_yn !== "Y");
      setlist(filteredList);
      setloading(false);
    });
  }, [a.search]);
  return (
    <div>
      <Header />
      <div className="listWrap webSize">
        <h5 className="cateTitle">{a.search}에 대한 검색결과</h5>
      </div>
      {loading ? <Loading /> : <Searchitem item={list} />}
      <Footer />
    </div>
  );
};

export default Searchlist;
