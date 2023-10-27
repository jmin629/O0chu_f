import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Searchlist from "../search/Searchlist";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [Search, setSearch] = useState("");
  const nav = useNavigate();

  const Submit = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (Search.trim() === "") {
      alert("검색어를 입력하세요.");
      return; // 검색어가 공백이면 함수를 빠져나감
    }
    setSearch("");

    nav(`/search/research/${Search}`);
  };

  return (
    <div>
      <Form onSubmit={Submit}>
        <input
          type="text"
          className="marR_5"
          placeholder="제목을 검색하세요."
          id="inputPassword5"
          value={Search}
          aria-describedby="passwordHelpBlock"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <Button variant="outline-success marR_10" onClick={Submit}>
          검색
        </Button>
      </Form>
    </div>
  );
};

export default Search;
