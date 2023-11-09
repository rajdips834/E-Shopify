import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import ProductCard from "./ProductCard";
import productsData from "../../data/data.json";

function ProductList() {
  console.log(productsData); // Log the data to the console
  const context = useContext(myContext);
  const { mode } = context;

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
          {productsData.products.map((product, index) => (
            <ProductCard
              title={product.title}
              price={product.price}
              image={product.image}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
