import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import axios from "axios";
export default function Signup() {

  useEffect(() => {
    console.log('i am here');

  }, []);
  const [username, setUsername] = useState("");
  const [Gmail, setGmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showpassword, setShowpassword] = useState(false);
  const [Validpass, setValidpass] = useState({
    hasDigit: false,
    hasCharacter: false,
    hasSymbol: false,
    minLength: false,
  });

  useEffect(() => {
    const hasDigit = /[0-9]/.test(password);
    const hasCharacter = /[a-zA-Z]/.test(password);
    const hasSymbol = /[^\w\s]/.test(password); // Adjusted regex to not exclude spaces
    const minLength = password.length >= 8;
    setValidpass(hasDigit && hasCharacter && hasSymbol && minLength);
  }, [password]);

  const handleSignup = async (event) => {
    // console.clear()
    console.log("here");
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!Gmail || !username || !Validpass) {
      setErrorMessage("Gmail/username/password is missing!!!");
      return; // Prevent form submission if login area is emplty
    }

    try {
      console.log(username, Gmail, password)
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        Gmail,
        password,
      }, {
        headers: "application/json"
      });
      // console.log("data is submitted very welley!!");
      console.log("chekc");
      setSuccessMessage(response.data);
      setUsername("");
      setGmail("");
      setpassword("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  const togglepasswordVisibility = () => {
    setShowpassword(!showpassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6 text-white text-center font-semibold text-xl tracking-wider">
          Admin Signup
        </div>
        <form
          className="p-6"
          method="post"
          onSubmit={handleSignup}
          // action={"/login"}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              autoComplete="off"
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="admin280"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Gmail"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Gmail
            </label>
            <input
              autoComplete="off"
              type="email"
              id="Gmail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="admin@gmail.com"
              value={Gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            {" "}
            {/* Add relative positioning here */}
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              password
            </label>
            <input
              autoComplete="off"
              type={showpassword ? "text" : "password"} // Dynamically set input type
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 bottom-15 md:bottom-8 pr-3 flex items-center cursor-pointer"
              onClick={togglepasswordVisibility}
            >
              {showpassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </span>
            {!Validpass ? (
              <label className="text-red-500" htmlFor="password">
                password must contain at least 8 characters, including
                uppercase, digit & special symbol
              </label>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!Validpass ? "opacity-50 cursor-not-allowed" : ""
                }`}
              type="submit"
              disabled={!Validpass}
            >
              Sign Up
            </button>
            {/* You can add a signup button or link here if needed */}
            {/* <button
              className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              type="button"
            >
              Log In
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
