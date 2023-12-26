import React from "react";
import {FaAngleRight} from "react-icons/fa6";
import {FaAngleLeft} from "react-icons/fa6";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber - 1;
  let dif = totalPage - pageNumber;

  if (dif < showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : totalPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btn = [];

    for (let index = startPage; index <= totalPage; index++) {
      btn.push(
        <li
          className={`${
            pageNumber === index
              ? "bg-main shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
              : "bg-gray-400 hover:bg-gray-400/80 shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
          }`}
          onClick={() => setPageNumber(index)}
        >
          {index}
        </li>
      );
    }

    // if (totalPage > 2) {
    //   for (let index = startPage; index <= endPage; index++) {
    //     btn.push(
    //       <li
    //         className={`${
    //           pageNumber === index
    //             ? "bg-green-400/50 shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
    //             : "bg-gray-400/30 hover:bg-green-300/20 shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
    //         }`}
    //         onClick={() => setPageNumber(index)}
    //       >
    //         {index}
    //       </li>
    //     );
    //   }
    // } else {
    //   for (let index = startPage; index < endPage; index++) {
    //     btn.push(
    //       <li
    //         className={`${
    //           pageNumber === index
    //             ? "bg-green-400/50 shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
    //             : "bg-gray-400/30 hover:bg-green-300/20 shadow-md w-[33px] h-[33px] rounded-full flex items-center justify-center cursor-pointer text-white font-semibold"
    //         }`}
    //         onClick={() => setPageNumber(index)}
    //       >
    //         {index}
    //       </li>
    //     );
    //   }
    // }
    return btn;
  };

  return (
    <ul className="flex gap-3 items-center">
      {pageNumber > 1 && (
        <li
          className="w-[33px] h-[33px] rounded-full flex items-center justify-center bg-gray-400 hover:bg-gray-400/80 text-white cursor-pointer"
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <FaAngleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          className="w-[33px] h-[33px] rounded-full flex items-center justify-center bg-gray-400 hover:bg-gray-400/80 text-white cursor-pointer"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <FaAngleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
