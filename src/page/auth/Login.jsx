import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
const Login = () => {
  const context = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="flex items-center justify-center h-screen ">
        \{" "}
        <div className="px-10 py-10 bg-gray-800 rounded-xl">
          <div className="">
            <h1 className="mb-4 text-xl font-bold text-center text-white">
              Login
            </h1>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mb-3 ">
            <button
              onClick={login}
              className="w-full px-2 py-2 font-bold text-black bg-yellow-500 rounded-lg "
            >
              Login
            </button>
          </div>
          <div>
            <h2 className="text-white">
              Don't have an account{" "}
              <Link className="font-bold text-yellow-500 " to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
