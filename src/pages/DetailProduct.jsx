import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from "../components/Ratings";
import {FaHeart} from "react-icons/fa";
import {FaFacebookF, FaLinkedin} from "react-icons/fa";
import {AiFillGithub, AiOutlineTwitter} from "react-icons/ai";
import Products from "../components/products/Products";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper/modules";
import {IoEyeSharp} from "react-icons/io5";
import {FaShoppingCart} from "react-icons/fa";
import Review from "../components/Review";

const DetailProduct = () => {
  const [image, setImage] = useState("");
  const [state, setState] = useState("description");
  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 3000},
      items: 5,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 5,
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
      items: 3,
    },
    xsmobile: {
      breakpoint: {max: 440, min: 0},
      items: 3,
    },
  };

  const images = [1, 2, 3, 4, 5, 6, 7];
  const discount = 15;
  const stock = 5;

  return (
    <div>
      <Header />
      <section className="w-[85%] mx-auto rounded-md bg-main h-[220px] mt-6 md-lg:mt-0 bg-cover bg-no-repeat relative">
        <div className="absolute left-0 top-0 h-full w-full text-white">
          <div className="flex flex-col justify-center items-center gap-1 h-full w-full">
            <div className="py-10 px-16 bg-gray-300/20 rounded-md flex flex-col items-center">
              <h2 className="text-3xl md-lg:text-xl font-semibold uppercase">
                DETAIL PRODUCT
              </h2>
              <div className="flex md-lg:hidden items-center gap-2">
                <Link to={"/"}>Home</Link>
                <FaAngleDoubleRight />
                <span>Smartphone</span>
                <FaAngleDoubleRight />
                <span>iPhone 15 promax</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16 mt-10">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[500px] md-lg:h-[300px] w-auto mx-auto"
                  src={
                    "https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png"
                  }
                  alt=""
                />
              </div>
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            src={`https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h2 className="text-blue-600">iPhone 15 promax</h2>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={4.5} />
                </div>
                <span className="text-green-500">(23 reviews)</span>
              </div>
              <div className="text-2xl text-red-500 font-bold flex gap-5">
                {discount ? (
                  <div className="flex items-center gap-5">
                    <h2 className="line-through">$500</h2>
                    <h2 className="flex items-center gap-5">
                      <span>${500 - Math.floor((500 * discount) / 100)}</span>{" "}
                      <span className="py-1 px-4 bg-red-400 rounded-full text-sm text-white">
                        -{discount}%
                      </span>
                    </h2>
                  </div>
                ) : (
                  <h2>Price : $500</h2>
                )}
              </div>
              <div className="text-slate-600">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has
                </p>
              </div>
              <div className="flex gap-3 pb-10 border-b">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl rounded-md">
                      <div className="px-6 md-lg:px-4 cursor-pointer">-</div>
                      <div className="px-5 md-lg:px-3">5</div>
                      <div className="px-6 md-lg:px-4 cursor-pointer">+</div>
                    </div>
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer bg-main rounded-md text-white">
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white rounded-md">
                    <FaHeart />
                  </div>
                </div>
              </div>
              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share on</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `In Stock(${stock})` : "Out of Stock"}
                  </span>
                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <Link
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                        href="#"
                      >
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                        href="#"
                      >
                        <AiOutlineTwitter />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg  bg-main text-white rounded-md">
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg bg-main text-white rounded-md">
                  Chat Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 ${
                      state === "description"
                        ? "bg-main text-white"
                        : "bg-gray-400/50"
                    } rounded-md`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 px-5 ${
                      state === "reviews"
                        ? "bg-main text-white"
                        : "bg-gray-400/50"
                    } rounded-md`}
                  >
                    Reviews
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    <Review />
                  ) : (
                    <div className="py-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis, dolores sed. Minus nostrum ab quos quo non
                      accusamus laborum doloribus doloremque sint! Nisi facere
                      quam aut autem voluptates labore eveniet.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="flex flex-col gap-2 px-3">
                  <Products title={"From ABC Shop"} titleSmall />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-5">
            Related Products
          </h2>
          <div>
            <Swiper
              slidesPerView={"auto"}
              breakpoints={{
                1280: {
                  slidesPerView: 5,
                },
                565: {
                  slidesPerView: 3,
                },
                390: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="group transition-all duration-500 hover:shadow-lg hover:-mt-2 rounded-md mb-5">
                    <div className="relative overflow-hidden">
                      <div className="bg-red-400 flex items-center justify-center absolute text-white py-3 px-2 rounded-full left-1 top-1 font-semibold">
                        -10%
                      </div>
                      <img
                        src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-pro-natural-titanium-pure-back-iphone-15-pro-natural-titanium-pure-front-2up-screen-usen.png"
                        alt=""
                        className="w-full"
                      />
                      <div className="absolute top-5  flex flex-col gap-2 -right-full group-hover:right-1 transition-all duration-500">
                        <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                          <FaHeart />
                        </span>
                        <Link
                          to={`/product/details/123`}
                          className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110"
                        >
                          <IoEyeSharp />
                        </Link>
                        <span className="w-[38px] h-[38px] cursor-pointer bg-main flex justify-center items-center rounded-full hover:bg-gray-400/30 transition-all hover:scale-110">
                          <FaShoppingCart />
                        </span>
                      </div>
                    </div>
                    <div className="py-2 px-4 text-blue-600">
                      <Link
                        to={`/product/details/123`}
                        className="flex justify-center font-semibold text-lg"
                      >
                        Iphone 15 ProMax
                      </Link>
                      <div className="flex justify-center mt-3 mb-5">
                        <Ratings ratings={4} />
                      </div>
                      <div className="flex justify-center p-2 bg-main text-white rounded-md text-lg font-semibold">
                        $1234
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-full flex justify-center items-center mb-5">
              <div className="custom_bullet justify-center gap-3 !w-auto"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DetailProduct;
