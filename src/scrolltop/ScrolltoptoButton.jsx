import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      // 컴포넌트 unmount 시 리스너 제거
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // 예: 300px 이상 스크롤되면 버튼 보이게 설정
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <div className="scroll-to-top" onClick={scrollToTop}>
        Top
      </div>
    )
  );
};

export default ScrollToTopButton;
