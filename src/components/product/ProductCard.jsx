import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
const ProductCard = ({ title, price, image }) => {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div className="p-4 md:w-1/4 drop-shadow-lg ">
      <div
        className="h-full overflow-hidden transition-shadow duration-300 ease-in-out border-2 border-gray-200 hover:shadow-gray-100 hover:shadow-2xl border-opacity-60 rounded-2xl"
        style={{
          backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="flex justify-center cursor-pointer">
          <img
            className="w-full p-2 duration-300 ease-in-out  rounded-2xl h-80 hover:scale-110 transition-scale-110"
            src={image}
            alt="blog"
          />
        </div>
        <div className="p-5 border-t-2">
          <h1
            className="mb-3 text-lg font-medium text-gray-900 title-font"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {title}
          </h1>
          {/* <p className="mb-3 leading-relaxed">{item.description.}</p> */}
          <p
            className="mb-3 leading-relaxed"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {price}
          </p>
          <div className="flex justify-center ">
            <button
              type="button"
              className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-indigo-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
