import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

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

const Banner = () => {
  return (
    <div className="w-full">
      <div className="w-[85%] mx-auto md-lg:mt-0 my-8">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="z-40">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
                autoPlaySpeed={5000}
                swipeable={false}
              >
                {[banner2, banner1, banner3, banner4, banner5].map(
                  (item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt=""
                      className="w-full md-lg:h-[200px] h-[550px] rounded-md"
                    />
                  )
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
