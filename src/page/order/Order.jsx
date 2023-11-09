import React from "react";
import myContext from "../../context/data/myContext";
import { useContext } from "react";
const Order = () => {
  const context = useContext(myContext);
  const { name, index } = context;
  return (
    <div>
      <h1>{name}</h1>
      <h2>{index}</h2>
    </div>
  );
};

export default Order;
