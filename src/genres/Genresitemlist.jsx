import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";
import { click } from "../_actions/click_action";
import Gettotalstar from "../detail/Gettotalstar";

const Genresitemlist = (props) => {
  const { list } = props;
  const nav = useNavigate();
  // const user = useSelector((state) => state.user);
  const [Load, setLoad] = useState(true);

  const dispatch = useDispatch();

  // const clicks = useSelector((state) => state.user.clickdata);

  // useEffect(() => {
  //   if (clicks !== undefined) {
  //     window.scrollTo(0, clicks);
  //     console.log(clicks);
  //   }
  // }, [clicks]);

  //  페이지로 왔을 때 저장된 커서 위치로 이동
  // 저장된 커서 위치로 이동하기

  return (
    <div className="listWrap webSize" id="listPage">
      <ul class="listBox">
        {list.map((item, index) => {
          if(item.delete_yn !== 'Y'){
          return (
            <li
              class="item"
              key={index}
              onClick={(event) => {
                event.preventDefault();

                dispatch(click(window.scrollY));

                nav(`/detail/${item.movie_id}`);
              }}
            >
              <a href="">
                {item.poster_path === "default_poster_url_here" ? <img src="/image/postrer.png" alt="포스터" /> : <img src={item.poster_path} alt="포스터" />}
                <div>
                  <h3>{item.kr_title}</h3>
                  <p>
                    <Gettotalstar movie_id={item.movie_id} />
                  </p>
                </div>
              </a>
            </li>
          );
            }else {
              return null;
            }
        })}
      </ul>
    </div>
  );
};

export default React.memo(Genresitemlist);
