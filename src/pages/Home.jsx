import React, {useEffect} from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";
import FeatureProduct from "../components/products/FeatureProduct";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {get_categories, get_products} from "../store/reducers/homeReducer";
import {get_cart_products} from "../store/reducers/cartReducer";

const Home = () => {
  const dispatch = useDispatch();
  const {latestProducts, topRatedProducts, discountProducts} = useSelector(
    (state) => state.home
  );
  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_categories());
    dispatch(get_products());
    if (userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Category />
      <FeatureProduct />
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title={"Latest Products"} products={latestProducts} />
            </div>
            <div className="overflow-hidden">
              <Products
                title={"Top Rated Products"}
                products={topRatedProducts}
              />
            </div>
            <div className="overflow-hidden">
              <Products
                title={"Discount Products"}
                products={discountProducts}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
