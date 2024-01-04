import React, {useEffect, useState} from "react";
import Ratings from "./Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import {AiFillStar} from "react-icons/ai";
import RatingReact from "react-rating";
import {CiStar} from "react-icons/ci";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {
  clearMessage,
  customer_rating,
  delete_customer_rating,
  get_customer_rating,
  get_one_product,
} from "../store/reducers/homeReducer";
import {FaTrashAlt} from "react-icons/fa";

const Review = ({product}) => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const {userInfo} = useSelector((state) => state.auth);
  const {errorMessage, successMessage, ratings, reviews, countReview} =
    useSelector((state) => state.home);
  const [rat, setRat] = useState("");
  const [re, setRe] = useState("");

  const submitRating = (e) => {
    e.preventDefault();
    if (!rat) {
      toast.error("Please choose star for rating");
    } else {
      dispatch(
        customer_rating({
          customerId: userInfo.id,
          name: userInfo.name,
          review: re,
          rating: rat,
          productId: product._id,
        })
      );
    }
  };

  const deleteReview = (id) => {
    dispatch(
      delete_customer_rating({
        id,
        customerId: userInfo.id,
      })
    );
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
      setRat("");
      setRe("");
      dispatch(
        get_customer_rating({
          productId: product._id,
          pageNumber,
        })
      );
      dispatch(get_one_product(product.slug));
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        get_customer_rating({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [pageNumber, product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">{product?.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-4xl">
            <Ratings ratings={product?.rating} />
          </div>
          <p className="text-sm text-slate-600">{countReview} Ratings</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${
                    Math.floor(
                      (100 * (+ratings[0]?.sum || 0)) / +countReview
                    ) || 0
                  }%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">{ratings[0]?.sum}</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${
                    Math.floor(
                      (100 * (+ratings[1]?.sum || 0)) / +countReview
                    ) || 0
                  }%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">{ratings[1]?.sum}</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${
                    Math.floor(
                      (100 * (+ratings[2]?.sum || 0)) / +countReview
                    ) || 0
                  }%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">{ratings[2]?.sum}</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${
                    Math.floor(
                      (100 * (+ratings[3]?.sum || 0)) / +countReview
                    ) || 0
                  }%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">{ratings[3]?.sum}</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${
                    Math.floor(
                      (100 * (+ratings[4]?.sum || 0)) / +countReview
                    ) || 0
                  }%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">{ratings[4]?.sum}</p>
          </div>
          {/* <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E] w-[0%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">0</p>
          </div> */}
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Products Reviews
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={item.rating} />
              </div>
              <span className="text-slate-600">{item.date}</span>
            </div>
            <span className="text-slate-600 text-md font-semibold">
              {item.name}
            </span>
            <p className="text-slate-600 text-sm">{item.review}</p>
            {item.customerId === userInfo.id && (
              <button
                className="p-2 bg-gray-400/50 text-red-400 w-fit rounded-full"
                onClick={() => deleteReview(item._id)}
              >
                <FaTrashAlt size={12} />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={countReview}
            parPage={perPage}
            showItem={3}
          />
        </div>
      </div>
      <div>
        {userInfo.id ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl">
                    <AiFillStar />
                  </span>
                }
              />
            </div>
            <form action="" onSubmit={submitRating}>
              <textarea
                className="border outline-0 p-3 w-full"
                name=""
                id=""
                cols="30"
                rows="5"
                onChange={(e) => setRe(e.target.value)}
                value={re}
                required
              ></textarea>
              <div className="mt-2">
                <button className="py-2 px-8 bg-main rounded-md text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              className="py-2 px-8 bg-main text-white rounded-md"
              to="/login"
            >
              Login To Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
