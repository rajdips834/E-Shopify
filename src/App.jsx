import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import MyState from "./context/data/MyState";
import Home from "./page/home/Home";
import Order from "./page/order/Order";
import NoPage from "./page/nopage/NoPage";
import Cart from "./page/cart/Cart";
import Dashboard from "./page/dashboard/Dashboard";
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
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;
