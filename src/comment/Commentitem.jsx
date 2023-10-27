import axios from "axios";
import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { api } from "../config/api";

const Commentitem = (props) => {
  const { item } = props;
  const [likes, setLikes] = useState(null);

  // 좋아요 버튼 클릭 이벤트 핸들러

  const like = (id, index) => {
    console.log(id, index);
    axios
      .post(`${api}/api/comment/likes/${id}`)
      .then((res) => {
        if (res.data === "success!") {
          const updatedItem = [...item];
          updatedItem[index].likes = updatedItem[index].likes + 1;
          //화면에 즉각 반영하기
          setLikes(updatedItem);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(likes);

  return item.map((comment, index) => {
    return (
      <ListGroup.Item key={comment.comment_id} as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{comment.email}</div>
          {comment.comments}
        </div>
        <Badge
          bg="primary"
          pill
          onClick={() => {
            like(comment.comment_id, index);
          }}
        >
          {comment.likes}
        </Badge>
      </ListGroup.Item>
    );
  });
};

export default Commentitem;
