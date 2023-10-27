import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../config/api";

function CommentList2({ movie }) {
  const [likes, setlike] = useState("like");
  const [likedComments, setLikedComments] = useState({});

  const [deletes, setdeletes] = useState("delete");
  const [deletedComments, setDeletedComments] = useState({});

  const user = useSelector((state) => state.user);
  let email = "";
  if (user !== undefined && user.userData !== undefined) {
    email = user.userData.email;
  }

  const like = (id, index) => {
    let cnt = 0;

    cnt = cnt + 1;

    if (likedComments[id] === 3) {
      alert("한 댓글에 좋아요는 세 번만 누를 수 있습니다!");
      return;
    }
    console.log(id, index);
    axios
      .post(`${api}/api/comment/likes/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success!") {
          const updatedItem = [...movie];
          updatedItem[index].likes = updatedItem[index].likes + 1;
          setLikedComments((prevLikedComments) => ({
            ...prevLikedComments,
            [id]: (prevLikedComments[id] || 0) + 1,
          }));

          //화면에 즉각 반영하기
          setlike(updatedItem);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (id, index) => {
    const confirmDelete = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
  if (!confirmDelete) {
    return;
  }

  axios
    .delete(`${api}/api/comment/updateDeleteStatus/${id}`)
    .then((res) => {
      if (res.data === "success") {
        // 댓글 삭제에 성공하면 클라이언트에서 해당 댓글을 숨김
        const updatedItem = [...movie];
        updatedItem[index].comment_delete_yn = 'Y'; 
        setlike(updatedItem);
      } else {
        console.log("댓글 삭제 실패");
      }
    })
    .catch((error) => {
      console.log("댓글 삭제 요청 중 오류 발생", error);
    });
};


  return (
    <ul className="commentList">
      {movie.map((item, index) => {

if (item.comment_delete_yn === 'Y'){
  return null;
}
        return (
          <li key={item.comment_id}>
            <div className="comment-meta">
              <div className="comment-nickname-date">
                <span>{item.nickname}</span> | <span>{item.update_time}</span>
              </div>
              <button
                className="like-button"
                onClick={() => {
                  like(item.comment_id, index);
                }}
              >
                👍 {item.likes === 0 ? "like" : item.likes}
              </button>

              {email === 'admin' && (
              <button 
                className="delete-button"
                onClick={() => {
                  deleteComment(item.comment_id, index);
                  }}
                >
                  X
                  </button>
              )}
            </div>
            <div className="comment-content">{item.comments}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList2;
