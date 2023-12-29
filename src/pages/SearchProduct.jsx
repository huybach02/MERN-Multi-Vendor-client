import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";
import Footer from "../components/Footer";
import {Range} from "react-range";
import {IoIosStar} from "react-icons/io";
import {IoIosStarOutline} from "react-icons/io";
import Products from "../components/products/Products";
import {BsFillGridFill} from "react-icons/bs";
import {FaThList} from "react-icons/fa";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
  get_categories,
  get_products,
  price_range_products,
  query_products,
} from "../store/reducers/homeReducer";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams.get("searchValue");
  const {products, totalProduct, latestProducts, priceRange} = useSelector(
    (state) => state.home
  );

  const [filter, setFilter] = useState(false);
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [styles, setStyles] = useState("grid");
  const [rating, setRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  useEffect(() => {
    dispatch(get_categories());
    // dispatch(get_products());
    dispatch(price_range_products());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  const resetRating = () => {
    setRating("");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        query_products({
          low: state.values[0],
          high: state.values[1],
          category,
          rating,
          sortPrice,
          pageNumber,
          searchValue,
        })
      );
    }, 200);
    return () => clearTimeout(timeout);
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    pageNumber,
    sortPrice,
    searchValue,
  ]);

  return (
    <div>
      <Header />
      <section className="w-[85%] mx-auto rounded-md bg-main h-[220px] mt-6 md-lg:mt-0 bg-cover bg-no-repeat relative">
        <div className="absolute left-0 top-0 h-full w-full text-white">
          <div className="flex flex-col justify-center items-center gap-1 h-full w-full">
            <div className="py-10 px-16 bg-gray-300/20 rounded-md flex flex-col items-center">
              <h2 className="text-3xl font-semibold">OUR SHOP</h2>
              <div className="flex items-center gap-2">
                <Link to={"/"}>Home</Link>
                <FaAngleDoubleRight />
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-6">
          <div className="w-[85%] mx-auto">
            <div className={`md:block hidden ${filter ? "mb-6" : "mb-0"}`}>
              <button
                className="text-center w-full py-2 px-3 bg-main rounded-md font-semibold"
                onClick={() => setFilter(!filter)}
              >
                Filter Product
              </button>
            </div>
            <div className="w-full flex flex-wrap">
              <div
                className={`w-3/12 md-lg:w-4/12 md:w-full md-lg:mt-5 pr-8 ${
                  filter
                    ? "md:h-0 md:overflow-hidden"
                    : "md:h-auto md:overflow-auto md:mb-6"
                }`}
              >
                <div className="py-3 flex flex-col gap-3">
                  <h2 className="md-lg:text-lg text-2xl font-semibold mb-3 text-blue-600">
                    Price
                  </h2>
                  <Range
                    step={5}
                    min={priceRange.low}
                    max={priceRange.high}
                    values={state.values}
                    onChange={(values) => setState({values})}
                    renderTrack={({props, children}) => (
                      <div
                        {...props}
                        className="md-lg:w-full w-[60%] md-lg:ml-5 flex h-[6px] bg-gray-300 rounded-full cursor-pointer"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({props}) => (
                      <div
                        className="w-[15px] h-[15px] bg-main rounded-full"
                        {...props}
                      />
                    )}
                  />
                  <div>
                    <span className="text-lg font-semibold text-blue-600">
                      ${Math.floor(state.values[0])} - $
                      {Math.floor(state.values[1])}
                    </span>
                  </div>
                </div>
                <div className="py-3 flex flex-col gap-3">
                  <h2 className="md-lg:text-lg text-2xl font-semibold mb-3 text-blue-600">
                    Ratings
                  </h2>
                  <div className="flex flex-col gap-3">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRating(5)}
                    >
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRating(4)}
                    >
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRating(3)}
                    >
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRating(2)}
                    >
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRating(1)}
                    >
                      <span className="text-[#EDBB0E]">
                        <IoIosStar size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                      <span className="text-[#EDBB0E]">
                        <IoIosStarOutline size={18} />
                      </span>
                    </div>
                    <button
                      className="px-3 py-1 bg-main w-[30%] rounded-md"
                      onClick={resetRating}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div>
                  <Products
                    title={"Lates Product"}
                    titleSmall
                    products={latestProducts}
                  />
                </div>
              </div>
              <div className="w-9/12 md-lg:w-8/12 md:w-full">
                <div className="">
                  <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border border-blue-600">
                    <h2 className="text-lg font-medium text-blue-600">
                      {totalProduct} Products Of {category || searchValue}
                    </h2>
                    <div className="flex justify-center items-center gap-3">
                      <select
                        onChange={(e) => setSortPrice(e.target.value)}
                        className="p-1 border outline-0 text-blue-600 font-semibold border-blue-600 rounded-md"
                        name=""
                        id=""
                      >
                        <option value="">Sort By</option>
                        <option value="low-to-high">Low to High Price</option>
                        <option value="high-to-low">High to Low Price</option>
                      </select>
                    </div>
                  </div>
                  <div className="pb-8">
                    <ShopProducts styles={styles} products={products} />
                  </div>
                  <div className="flex justify-center">
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      parPage={12}
                      showItem={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchProduct;
