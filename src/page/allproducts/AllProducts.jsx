import React, { useContext } from "react";
import ProductCard from "../../components/product/ProductCard";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
const AllProducts = () => {
  const context = useContext(myContext);
  const { productList } = context;
  return (
    <Layout>
      <div className="flex flex-wrap m-4">
        {productList.map((item, index) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.imageUrl}
            id={item.id}
            key={index}
          />
        ))}
      </div>
    </Layout>
  );
};

export default AllProducts;
