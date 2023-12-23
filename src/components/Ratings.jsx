import React from "react";
import {IoIosStar} from "react-icons/io";
import {IoIosStarHalf} from "react-icons/io";
import {IoIosStarOutline} from "react-icons/io";

const Ratings = ({ratings, size = 18}) => {
  return (
    <div className="flex items-center gap-1">
      {ratings >= 1 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStar size={size} />
        </span>
      ) : ratings >= 0.5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStarHalf size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          <IoIosStarOutline size={size} />
        </span>
      )}
      {ratings >= 2 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStar size={size} />
        </span>
      ) : ratings >= 1.5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStarHalf size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          <IoIosStarOutline size={size} />
        </span>
      )}
      {ratings >= 3 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStar size={size} />
        </span>
      ) : ratings >= 2.5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStarHalf size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          <IoIosStarOutline size={size} />
        </span>
      )}
      {ratings >= 4 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStar size={size} />
        </span>
      ) : ratings >= 3.5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStarHalf size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          <IoIosStarOutline size={size} />
        </span>
      )}
      {ratings >= 5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStar size={size} />
        </span>
      ) : ratings >= 4.5 ? (
        <span className="text-[#EDBB0E]">
          <IoIosStarHalf size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          <IoIosStarOutline size={size} />
        </span>
      )}
    </div>
  );
};

export default Ratings;
