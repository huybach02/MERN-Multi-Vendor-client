import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Category = () => {
  const {categories} = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 3000},
      items: 6,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 6,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 4,
    },
    mdtablet: {
      breakpoint: {max: 991, min: 464},
      items: 4,
    },
    mobile: {
      breakpoint: {max: 768, min: 0},
      items: 3,
    },
    smmobile: {
      breakpoint: {max: 640, min: 0},
      items: 2,
    },
    xsmobile: {
      breakpoint: {max: 440, min: 0},
      items: 2,
    },
  };
  return (
    <div className="w-[85%] mx-auto relative mb-5">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories?.length > 0 &&
          categories?.map((item, index) => (
            <Link
              className="h-[200px] border rounded-md block mx-1"
              to={item.slug}
            >
              <div className="w-full h-full ">
                <img
                  src={item.image}
                  alt=""
                  className="w-auto h-[90%] mx-auto p-5"
                />
                <div className="absolute bottom-1 w-full mx-auto font-bold left-0 flex justify-center items-center">
                  <span className="py-1 px-2 w-full mx-3 text-center bg-main text-white rounded-md">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default Category;
