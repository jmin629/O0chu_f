import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const Paging = ({ totalcount, onPageChagne }) => {
  const itemsPerPage = 5; // Number of items to display per page
  const totalItems = totalcount; // Total number of items props로 받아야되고

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChagne(page);
    console.log(`Clicked page ${page}`);
  };

  const handlePreviousBlockClick = () => {
    if (currentPage > 1) {
      // Calculate the start page of the previous block
      const startPageOfPreviousBlock = Math.max(1, (Math.floor((currentPage - 1) / 5) - 1) * 5 + 1);
      const newPage = startPageOfPreviousBlock + 4;
      handlePageChange(newPage);
    }
  };

  const handleNextBlockClick = () => {
    if (currentPage < totalPages) {
      // Calculate the start page of the next block
      const startPageOfNextBlock = Math.ceil(currentPage / 5) * 5 + 1;
      const newPage = startPageOfNextBlock;
      handlePageChange(newPage);
    }
  };

  let items = [];

  // Calculate the range of page buttons to display (5 pages at a time)
  const pageRange = 5;
  const startPage = Math.max(1, (Math.ceil(currentPage / pageRange) - 1) * pageRange + 1);
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="pageBox">
      <Pagination>
        <Pagination.Prev onClick={handlePreviousBlockClick} disabled={currentPage <= 1} />
        {items}
        <Pagination.Next onClick={handleNextBlockClick} disabled={currentPage >= totalPages} />
      </Pagination>
    </div>
  );
};

export default Paging;
