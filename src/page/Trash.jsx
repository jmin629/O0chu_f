import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import Auth from "../hoc/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "../config/api";

const Trash = (props) => {
    const nav = useNavigate();
    const { item } = props;
    const [deletedMovies, setDeletedMovies] = useState([]);

    useEffect(() => {
        axios.get(`${api}/api/movies/trash`)
        .then((response) => {
            setDeletedMovies(response.data);
        })
        .catch((error) => {
            console.error("에러 발생 : ", error);
        });
    }, []);

    return (
        <div>
            <Header />
            <div className="minhi">
                {deletedMovies.length === 0 ? (
                    <h2>휴지통이 비었습니다~</h2>
                ) : (
                    <div className="listWrap webSize">
                        <ul className="listBox">
                            {deletedMovies.map((item, index) => (
                                <li
                                    className="item" 
                                    key={index}
                                    onClick={() => {
                                        nav(`/detail/${item.movie_id}`);
                                    }}
                                >
                                    <a href="">
                                        <img src={item.poster_path} alt="포스터" />
                                        <div>
                                            <h3>{item.kr_title}</h3>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Footer />
            </div>
        </div>
    );
};

export default Trash;