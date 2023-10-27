import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { click } from "../_actions/click_action";
import { useDispatch, useSelector } from "react-redux";
import Gettotalstar from "../detail/Gettotalstar";

const Searchitem = (props) => {
  const nav = useNavigate();
  const dispath = useDispatch();
  const { item } = props;

  const filteredItems = item.filter((item) => item.delete_yn === 'N');

  const clicks = useSelector((state) => state.user.clickdata);

  useEffect(() => {
    if (clicks !== undefined) {
      window.scrollTo(0, clicks);
    }
  }, []);
  return (
    <div className="minhi">
      {item.length === 0 ? (
        <div className="listWrap webSize">결과 없음..</div>
      ) : (
        <div className="listWrap webSize">
          <ul class="listBox">
            {item.map((item, index) => {
              return (
                <li
                  class="item"
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    dispath(click(window.scrollY));

                    nav(`/detail/${item.movie_id}`);
                  }}
                >
                  <a href="">
                    {item.poster_path === "default_poster_url_here" || item.poster_path === "" ? <img src="/image/postrer.png" alt="포스터" /> : <img src={item.poster_path} alt="포스터" />}
                    <div>
                      <h3>{item.kr_title}</h3>
                      <Gettotalstar movie_id={item.movie_id} />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchitem;
