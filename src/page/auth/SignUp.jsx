import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/firebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      setLoading(false);
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("Signup successfull");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      toast.error("Signup Failed");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      {loading && <Loader />}
      <div className="px-10 py-10 bg-gray-800 rounded-xl">
        <div className="">
          <h1 className="mb-4 text-xl font-bold text-center text-white">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
            required
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => {
              if (!isValidEmail(e.target.value)) {
                setError("Email is invalid");
              } else {
                setError(null);
              }

              setEmail(e.target.value);
            }}
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
          {error && <h2 style={{ color: "red" }}>{error}</h2>}
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center mb-3 ">
          <button
            disabled={error == null ? false : true}
            onClick={signup}
            style={{ backgroundColor: error == null ? "#ff0000" : "#808080" }}
            className="w-full px-2 py-2 font-bold text-white rounded-lg "
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className="font-bold text-red-500 " to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
