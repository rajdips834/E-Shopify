import React from "react";
import Layout from "../../components/layout/Layout";
import HeroBanner from "../../components/herobanner/HeroBanner";
import Filter from "../../components/fliter/filter";
import ProductList from "../../components/product/ProductList";
function Home() {
  return (
    <Layout>
      <HeroBanner />
      <Filter />
      <ProductList />
    </Layout>
  );
}

export default Home;
