import React from "react";
import { useNavigate } from "react-router-dom";
import Gettotalstar from "../detail/Gettotalstar";

const Suggestionitem = (props) => {
  const { item } = props;
  const nav = useNavigate();

  const filteredItems = item.filter((item) => item.delete_yn === 'N');

  return (
    <ul class="listBox">
      {filteredItems.map((item, index) => {
        return (
          <li
            class="item"
            key={index}
            onClick={() => {
              nav(`/detail/${item.movie_id}`);
            }}
          >
            <a href="">
              {item.poster_path === "default_poster_url_here" ? <img src="/image/postrer.png" alt="포스터" /> : <img src={item.poster_path} alt="포스터" />}
              <div>
                <h3>{item.kr_title}</h3>
                <Gettotalstar movie_id={item.movie_id} />
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestionitem;
