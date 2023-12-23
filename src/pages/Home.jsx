import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";
import FeatureProduct from "../components/products/FeatureProduct";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Category />
      <FeatureProduct />
    </div>
  );
};

export default Home;
