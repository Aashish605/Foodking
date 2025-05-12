import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
export default function Login_admin() {
  const [Gmail, setGmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowpassword] = useState(false);
  const [Validpass, setValidpass] = useState({
    hasDigit: false,
    hasCharacter: false,
    hasSymbol: false,
    minLength: false,
  });

  useEffect(() => {
    const hasDigit = /[0-9]/.test(Password);
    const hasCharacter = /[a-zA-Z]/.test(Password);
    const hasSymbol = /[^\w\s]/.test(Password); // Adjusted regex to not exclude spaces
    const minLength = Password.length >= 8;
    setValidpass(hasDigit && hasCharacter && hasSymbol && minLength);
  }, [Password]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    console.log("this is handlesignup in frontend function");

    if (!Gmail) {
      console.error("Gmail is required");
      return; // Prevent form submission if Gmail is empty
    }

    if (!Validpass) {
      setErrorMessage("Password must meet the required criteria.");
      return;
    }

    try {
      const response = await axios.post("https://backe-liard.vercel.app/signup", {
        Gmail,
        Password,
      });
      setSuccessMessage(response.data);
      setGmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-300 py-4 px-6 text-black text-center font-semibold text-xl tracking-wider">
          Admin Signup
        </div>
        <form className="p-6" onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="Gmail"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Gmail
            </label>
            <input
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
              htmlFor="Password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative ">
            <input
              type={showPassword ? "text" : "password"} // Dynamically set input type
              id="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-2  cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </span>
            </div>
            {!Validpass ? (
              <label className="text-red-500" htmlFor="Password">
                Password must contain at least 8 characters, including
                uppercase, digit & special symbol
              </label>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !Validpass ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={!Validpass}
            >
              Sign Up
            </button>
            {/* You can add a signup button or link here if needed */}
          </div>
        </form>
      </div>
    </div>
  );
}
