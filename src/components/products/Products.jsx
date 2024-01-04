import React from "react";
import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 1,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 1,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
};

const Products = ({title, titleSmall, products}) => {
  const ButtonGroup = ({next, previous}) => {
    return (
      <div className="flex justify-between items-center">
        <div
          className={`"text-center flex justify-center items-center flex-col md-lg:text-2xl text-3xl text-blue-600 font-bold relative md-lg:py-5 py-10 ${
            titleSmall && "py-0"
          }`}
        >
          <h2 className={`${titleSmall && "text-2xl"}`}>{title}</h2>
        </div>
        <div className="flex justify-center items-center gap-3 md-lg:pr-0 pr-10">
          <button
            className="w-[30px] h-[30px] flex items-center justify-center border border-blue-600 rounded-md"
            onClick={() => previous()}
          >
            <span>
              <FaAngleLeft color="#2563eb" size={20} />
            </span>
          </button>
          <button
            className="w-[30px] h-[30px] flex items-center justify-center border border-blue-600 rounded-md"
            onClick={() => next()}
          >
            <span>
              <FaAngleRight color="#2563eb" size={20} />
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={false}
        showDots={false}
        responsive={responsive}
        autoPlaySpeed={7000}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products?.length > 0 &&
          products?.map((item, index) => (
            <div key={index} className="flex flex-col-reverse gap-2">
              {item?.map((i, j) => (
                <Link
                  to={`/product/details/${i.slug}`}
                  key={j}
                  className="flex items-center"
                >
                  <img
                    src={i.images.length > 0 && i.images[0]}
                    alt=""
                    className="w-[110px] h-[110px] p-3"
                  />
                  <div className="px-3 flex flex-col text-blue-600 gap-1">
                    <h2 className="text-lg font-semibold">{i.name}</h2>
                    <span className="">${i.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Products;
