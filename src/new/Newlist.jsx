import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Gettotalstar from "../detail/Gettotalstar";

function Newlist({ movie, id }) {
  const [newlist, setnewlist] = useState([]);
  const [load, setloda] = useState(true);
  const nav = useNavigate();

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true); // 초기값을 true로 설정
  const [translate, setTranslate] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setnewlist(movie);
    setloda(false);
  }, [movie]);

  useEffect(() => {
    const kindWrap = document.querySelector(".kind_wrap");
    const slider = kindWrap ? kindWrap.querySelector(".slider") : null;
    const slideLis = slider ? slider.querySelectorAll("li") : [];
    const prevButton = document.querySelector(".arrow .prev");
    const nextButton = document.querySelector(".arrow .next");

    if (kindWrap && slider && slideLis.length > 0) {
      const liWidth = 232;
      const gap = 20;
      const moveDistance = liWidth + gap;
      const sliderWidth = liWidth * slideLis.length + gap * (slideLis.length - 1);
      slider.style.width = `${sliderWidth}px`;

      function moveSlide(event) {
        event.preventDefault();
        let newTranslate = translate;

        if (event.target.className === "next" && currentIdx < slideLis.length - 5) {
          newTranslate -= moveDistance;
          setCurrentIdx((prevIdx) => prevIdx + 1);
          setShowPrev(true);
          setShowNext(currentIdx + 1 < slideLis.length - 5);
        } else if (event.target.className === "prev" && currentIdx > 0) {
          newTranslate += moveDistance;
          setCurrentIdx((prevIdx) => prevIdx - 1);
          setShowPrev(currentIdx - 1 > 0);
          setShowNext(true);
        }
        setTranslate(newTranslate);
        slider.style.transform = `translateX(${newTranslate}px)`;
      }

      if (prevButton) {
        prevButton.addEventListener("click", moveSlide);
      }

      if (nextButton) {
        nextButton.addEventListener("click", moveSlide);
      }

      return () => {
        if (prevButton) {
          prevButton.removeEventListener("click", moveSlide);
        }
        if (nextButton) {
          nextButton.removeEventListener("click", moveSlide);
        }
      };
    }
  }, [load, translate, currentIdx, newlist.length]);

  return (
    <div style={{ position: "relative" }}>
      {load ? (
        <h1>loda...</h1>
      ) : (
        <div style={{ position: "relative" }}>
          <div className="kind_wrap">
            <div className="kind_slider">
              <ul className="slider">
                {newlist.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      document.location.href = "/detail/" + item.movie_id;
                    }}
                  >
                    <a>
                      {item.poster_path === "default_poster_url_here" ? <img src="/image/postrer.png" alt="포스터" /> : <img src={item.poster_path} alt="포스터" />}
                      <div>
                        <h3 className="movieTitle">{item.kr_title}</h3>
                        <Gettotalstar movie_id={item.movie_id} />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="arrow">
            {showPrev && (
              <a href="#" className="prev">
                &lt;
              </a>
            )}
            {showNext && (
              <a href="#" className="next">
                &gt;
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Newlist;
