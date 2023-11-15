import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import ProductCard from "./ProductCard";

function ProductList() {
  const context = useContext(myContext);
  const { mode, productList } = context;
  console.log(productList);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto md:py-16">
        <div className="w-full mb-6 lg:w-1/2 lg:mb-10">
          <h1
            className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="w-20 h-1 bg-blue-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {productList.map((item, index) => (
            <ProductCard
              title={item.title}
              price={item.price}
              image={item.imageUrl}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
