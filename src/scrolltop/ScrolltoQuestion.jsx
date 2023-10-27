import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ScrollToQuestion = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    // 다이어로그 열기
    setDialogOpen(true);
  };

  const closeDialog = () => {
    // 다이어로그 닫기
    setDialogOpen(false);
  };

  return (
    <div className="scroll-to-question">
      <div id="question-icon" onClick={openDialog}>
        <FontAwesomeIcon icon={faQuestion} />
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog} className="custom-dialog" fullWidth>
        <DialogTitle className="custom-title">오영추 사이트 이용방법</DialogTitle>
        <DialogContent>
          <p>1. 회원가입을 진행해주세요.</p>
          <p>2. 좋아하는 영화에 평점을 남겨주세요.</p>
          <p>3. 메인페이지에서 추천 영화를 확인해주세요.</p>
          <p>4. 오영추 사이트를 즐겨주세요.</p>
        </DialogContent>
        <Button onClick={closeDialog} color="primary">
          닫기
        </Button>
      </Dialog>
    </div>
  );
};

export default ScrollToQuestion;
