import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const deleteCartItem = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted item ");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmout, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = parseInt(100);

  const grandTotal = shipping + totalAmout;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uniqueCartItems, setUniqueCartItems] = useState([]);

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const paymentId =
      JSON.parse(localStorage.getItem("user")).uid +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: JSON.parse(localStorage.getItem("user")).email,
      userid: JSON.parse(localStorage.getItem("user")).uid,
      paymentId,
    };

    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
    } catch (error) {
      console.log(error);
    }

    cartItems.forEach((item) => {
      deleteCartItem(item);
    });
  };

  useEffect(() => {
    const uniqueItemsMap = cartItems.reduce((acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = { ...item, quantity: 1 };
      } else {
        acc[item.title].quantity += 1;
      }
      return acc;
    }, {});

    const uniqueItemsArray = Object.values(uniqueItemsMap);
    setUniqueCartItems(uniqueItemsArray);
  }, [cartItems]);

  const productCount = (item) => {
    let count = 0;
    cartItems.forEach((cartItem) => {
      if (cartItem.image === item.image) {
        count++;
      }
    });
    return count;
  };

  return (
    <Layout>
      <div className="min-h-screen pt-5 bg-gray-100">
        <h1 className="mb-10 text-2xl font-bold text-center">Cart Items</h1>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col mb-6 rounded-lg md:mb-0">
              {uniqueCartItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="p-6 bg-white border rounded-lg drop-shadow-xl"
                  >
                    <img
                      src={item.image}
                      alt="product-image"
                      className="w-full mb-4 rounded-lg"
                    />
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-900">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          ₹{item.price}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          Quantity: {productCount(item)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          onClick={() => deleteCartItem(item)}
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            {/* ... (existing SVG path) */}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col rounded-lg">
              <div className="p-6 bg-white border rounded-lg shadow-md">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">₹{totalAmout}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">₹{shipping}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-3">
                  <p className="text-lg font-bold">Total</p>
                  <div className="font-bold">₹{grandTotal}</div>
                </div>
                <Modal
                  name={name}
                  address={address}
                  pincode={pincode}
                  phoneNumber={phoneNumber}
                  setName={setName}
                  setAddress={setAddress}
                  setPincode={setPincode}
                  setPhoneNumber={setPhoneNumber}
                  buyNow={buyNow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
