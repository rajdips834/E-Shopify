import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import ProductInfo from "./page/productInfo/ProductInfo";
import MyState from "./context/data/MyState";
import Home from "./page/home/Home";
import Order from "./page/order/Order";
import NoPage from "./page/nopage/NoPage";
import Cart from "./page/cart/Cart";
import Dashboard from "./page/admin/dashboard/Dashboard";
import Login from "./page/auth/SignUp";
import SignUp from "./page/auth/Login";
const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;
