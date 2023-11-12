import React, { useState } from "react";
import myContext from "./myContext";
const MyState = (props) => {
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [mode, setMode] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    }
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white ";
    }
  };
  const toggleLoginStatus = () => {
    if (isLoggedIn === false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        Loading,
        setLoading,
        isLoggedIn,
        toggleLoginStatus,
        setUserData,
        userData,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default MyState;
