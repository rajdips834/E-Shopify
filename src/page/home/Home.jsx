import React from "react";
import Layout from "../../components/layout/Layout";
import HeroBanner from "../../components/herobanner/HeroBanner";
import Filter from "../../components/fliter/filter";
import ProductList from "../../components/product/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const addCart = () => {
    dispatch(addToCart("shirt"));
  };
  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  };
  return (
    <Layout>
      <div>
        <button className="bg-gray-300" onClick={addCart}>
          Add
        </button>
        <button className="bg-gray-300 " onClick={deleteCart}>
          Delete
        </button>
        {cartItem.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <HeroBanner />
      <Filter />
      <ProductList />
    </Layout>
  );
}

export default Home;
