import React from "react";
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

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={<ProtectedRouteForUser component={<Order />} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRouteForAdmin component={<Dashboard />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/updateproduct"
            element={<ProtectedRouteForAdmin component={<UpdateProduct />} />}
          />
          <Route
            path="/addproduct"
            element={<ProtectedRouteForAdmin component={<AddProduct />} />}
          />
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;

const ProtectedRouteForUser = ({ component }) => {
  const user = localStorage.getItem("user");
  return user ? component : <Navigate to="/login" />;
};

const ProtectedRouteForAdmin = ({ component }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  return admin && admin.user.email === "rajdips834@gmail.com" ? (
    component
  ) : (
    <Navigate to="/login" />
  );
};
