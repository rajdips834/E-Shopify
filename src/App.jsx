import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductInfo from "./page/productInfo/ProductInfo";
import MyState from "./context/data/MyState";
import Home from "./page/home/Home";
import Order from "./page/order/Order";
import NoPage from "./page/nopage/NoPage";
import Cart from "./page/cart/Cart";
import Dashboard from "./page/admin/dashboard/Dashboard";
import Login from "./page/auth/Login";
import SignUp from "./page/auth/SignUp";
import UpdateProduct from "./page/admin/page/UpdateProduct";
import AddProduct from "./page/admin/page/AddProduct";
import AllProducts from "./page/allproducts/AllProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route
            path="/order"
            element={
              <ProtectedRouteForUser>
                <Order />
              </ProtectedRouteForUser>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
};

export default App;

// user

export const ProtectedRouteForUser = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// admin

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin?.user?.email === "rajdips834@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
