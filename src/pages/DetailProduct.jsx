import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link, useNavigate, useParams} from "react-router-dom";
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
import {useDispatch, useSelector} from "react-redux";
import {get_one_product} from "../store/reducers/homeReducer";
import {
  add_to_cart,
  add_to_wishlist,
  clearMessage,
  get_cart_products,
  get_wishlist_products,
} from "../store/reducers/cartReducer";
import toast from "react-hot-toast";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {product, relatedProducts, moreProducts} = useSelector(
    (state) => state.home
  );
  const {userInfo} = useSelector((state) => state.auth);
  const {loader, errorMessage, successMessage} = useSelector(
    (state) => state.cart
  );

  const {slug} = useParams();

  const [image, setImage] = useState("");
  const [state, setState] = useState("description");
  const [quantity, setQuantity] = useState(1);
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

  const addToCart = () => {
    if (userInfo.id) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
      setTimeout(() => {
        dispatch(get_cart_products(userInfo.id));
      }, 200);
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  const addToWishList = () => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug,
      })
    );
    setTimeout(() => {
      dispatch(get_wishlist_products(userInfo.id));
    }, 200);
  };

  const buy = () => {
    let price = 0;
    if (product?.discount) {
      price =
        product?.price - Math.floor(product?.price * product?.discount) / 100;
    } else {
      price = product?.price;
    }

    const obj = [
      {
        sellerId: product?.sellerId?._id,
        shopName: product?.shopInfo?.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        product: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];
    navigate("/shipping", {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 10,
        items: 1,
      },
    });
  };

  useEffect(() => {
    dispatch(get_one_product(slug));
    setImage("");
  }, [slug]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
    }
  }, [errorMessage, successMessage]);

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
                <span>{product?.category}</span>
                <FaAngleDoubleRight />
                <span>{product?.name}</span>
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
                  className="h-[500px] md-lg:h-[300px] w-auto mx-auto p-3"
                  src={
                    image || (product?.images?.length > 0 && product?.images[0])
                  }
                  alt=""
                />
              </div>
              <div className="py-3">
                {product?.images?.length > 0 && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product?.images?.map((img, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => setImage(img)}
                          className={`border p-2 rounded-md mx-1 cursor-pointer ${
                            image === img && "border border-blue-600"
                          }`}
                        >
                          <img src={img} alt="" />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h2 className="text-blue-600">{product?.name}</h2>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={product?.rating} />
                </div>
                <span className="text-green-500">(23 reviews)</span>
              </div>
              <div className="text-2xl text-red-500 font-bold flex gap-5">
                {product?.discount ? (
                  <div className="flex items-center gap-5">
                    {product?.discount > 0 && (
                      <h2 className="line-through text-black font-medium text-xl">
                        ${product?.price}
                      </h2>
                    )}
                    <h2 className="flex items-center gap-5">
                      <span className="text-3xl">
                        $
                        {product?.price -
                          Math.floor(
                            (product?.price * product?.discount) / 100
                          )}
                      </span>{" "}
                      {product?.discount > 0 && (
                        <span className="py-1 px-4 bg-red-400 rounded-full text-sm text-white">
                          -{product?.discount}%
                        </span>
                      )}
                    </h2>
                  </div>
                ) : (
                  <h2>
                    Price : $
                    {product?.price -
                      Math.floor((product?.price * product?.discount) / 100)}
                  </h2>
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
                {product?.stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl rounded-md">
                      <div
                        className="px-6 md-lg:px-4 cursor-pointer"
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        -
                      </div>
                      <div className="px-5 md-lg:px-3">{quantity}</div>
                      <div
                        className="px-6 md-lg:px-4 cursor-pointer"
                        onClick={() =>
                          quantity < product?.stock && setQuantity(quantity + 1)
                        }
                      >
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        className="px-8 py-3 h-[50px] cursor-pointer bg-main rounded-md text-white"
                        onClick={() => addToCart()}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div
                    className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white rounded-md"
                    onClick={() => addToWishList()}
                  >
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
                  <span
                    className={`text-${product?.stock ? "green" : "red"}-500`}
                  >
                    {product?.stock
                      ? `In Stock (${product?.stock})`
                      : "Out of Stock"}
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
                {product?.stock ? (
                  <button
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg  bg-main text-white rounded-md"
                    onClick={buy}
                  >
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/dashboard/chat/${product?.sellerId?._id}`}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg bg-main text-white rounded-md"
                >
                  Chat Seller
                </Link>
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
                    <Review product={product} />
                  ) : (
                    <div className="py-5">{product?.description}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="flex flex-col gap-2 px-3">
                  <div className="flex items-center gap-3 bg-main p-3 rounded-md">
                    <img
                      src={
                        product?.sellerId?.image ||
                        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                      }
                      alt=""
                      className="w-[50px] h-[50px] rounded-full border p-1"
                    />
                    <h2 className="text-lg font-semibold">
                      From {product?.sellerId?.shopInfo?.shopName}
                    </h2>
                  </div>
                  {moreProducts
                    ?.filter((i) => i.slug !== slug)
                    ?.map((item, index) => (
                      <Link
                        to={`/product/details/${item.slug}`}
                        key={index}
                        className="flex items-center border p-3 rounded-md shadow-md"
                      >
                        <img
                          src={item.images.length > 0 && item.images[0]}
                          alt=""
                          className="w-[110px] h-[110px] p-3"
                        />
                        <div className="px-3 flex flex-col text-blue-600 gap-1">
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <div className="text-red-500 font-bold flex gap-5">
                            {item?.discount ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-5">
                                  {item?.discount > 0 && (
                                    <h2 className="line-through text-black font-medium">
                                      ${item?.price}
                                    </h2>
                                  )}
                                  <h2 className="flex items-center gap-5">
                                    <span className="text-lg">
                                      $
                                      {item?.price -
                                        Math.floor(
                                          (item?.price * item?.discount) / 100
                                        )}
                                    </span>{" "}
                                  </h2>
                                </div>
                                {item?.discount > 0 && (
                                  <p className="py-1 px-2 bg-red-400 rounded-full text-sm text-white w-fit">
                                    -{item?.discount}%
                                  </p>
                                )}
                              </div>
                            ) : (
                              <h2>Price : $500</h2>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {relatedProducts?.filter((i) => i.slug !== slug)?.length > 0 && (
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <h2 className="text-2xl font-semibold text-blue-600 mb-5">
              Related Products
            </h2>
            <div>
              <Carousel
                autoPlay={true}
                infinite={true}
                responsive={responsive}
                transitionDuration={500}
              >
                {relatedProducts
                  ?.filter((i) => i.slug !== slug)
                  ?.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="group transition-all duration-500 hover:shadow-lg rounded-md mb-5"
                      >
                        <div className="relative overflow-hidden">
                          {item.discount > 0 && (
                            <div className="bg-red-400 flex items-center justify-center absolute text-white py-3 px-2 rounded-full left-1 top-1 font-semibold">
                              -{item?.discount}%
                            </div>
                          )}
                          <img
                            src={item?.images?.length > 0 && item.images[0]}
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
                            to={`/product/details/${item.slug}`}
                            className="flex justify-center font-semibold text-lg"
                          >
                            {item?.name}
                          </Link>
                          <div className="flex justify-center mt-3 mb-5">
                            <Ratings ratings={item?.rating} />
                          </div>
                          <div className="flex justify-center p-2 bg-main text-white rounded-md text-lg font-semibold">
                            $
                            {item?.price -
                              Math.floor((item?.price * item?.discount) / 100)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Carousel>

              <div className="w-full flex justify-center items-center mb-5">
                <div className="custom_bullet justify-center gap-3 !w-auto"></div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default DetailProduct;
