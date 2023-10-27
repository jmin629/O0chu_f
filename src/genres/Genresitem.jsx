import axios from "axios";
import React, { useEffect, useState } from "react";
import Genresitemlist from "./Genresitemlist";
import Loading from "../loading/Loading";
import Auth from "../hoc/auth";
import { useDispatch, useSelector } from "react-redux";
import { genreslist } from "../_actions/genres_action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { api } from "../config/api";

const Genresitem = (props) => {
  const { gen } = props;

  const [list, setlist] = useState([]);
  const [load, setload] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totals, setTotal] = useState(0);

  const moredata = () => {
    axios
      .get(`${api}/api/movie/genres/${gen}?pageNo=${pageNo}`)
      .then((res) => {
        setTotal(res.data.count);
        if (pageNo === 1) {
          setlist(res.data.item);
        } else {
          // 페이지 번호가 1 초과일 때, 새 데이터를 기존 데이터에 붙임
          setlist((prevList) => [...prevList, ...res.data.item]);
        }
        setload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const total = Math.ceil(totals / 20);

  // const handleLoadMore = () => {
  //   // 페이지 번호를 증가시키고 데이터를 추가
  //   setPageNo(pageNo + 1);
  // };

  useEffect(() => {
    setload(true);
    moredata();
  }, [gen, pageNo]);

  return (
    <div>
      <div>{load ? <Loading /> : <Genresitemlist list={list} />}</div>
      <div className="loadDown">
        <button
          onClick={() => {
            setPageNo(pageNo + 1);
          }}
        >
          <FontAwesomeIcon className="marR_10" icon={faArrowDown} />
          {pageNo}/{total}
        </button>
      </div>
    </div>
  );
};

export default Genresitem;
