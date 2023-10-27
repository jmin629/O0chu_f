import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../config/api";

function CommentInput({ movie_id }) {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);

  const onSubmit = (event) => {
    event.preventDefault();

    if (user !== undefined && user.userData !== undefined) {
      if (comment.trim() === "") {
        alert("댓글을 입력해주세요");
        return;
      }
      const body = {
        nickname: user.userData.nickname,
        comments: comment,
        movie_id: movie_id,
      };

      axios
        .post(`${api}/api/addcomment`, body)
        .then((res) => {
          if (res.data === "success!") {
            alert("작성완료");
            window.location.reload();
            setComment("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(body);
    }
  };
  return (
    <div className="commentInput">
      <form onSubmit={onSubmit}>
        <textarea
          className="commentText"
          type="text"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></textarea>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default CommentInput;
