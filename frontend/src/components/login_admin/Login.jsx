import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [Validpass, setValidpass] = useState({
    hasDigit: false,
    hasCharacter: false,
    hasSymbol: false,
    minLength: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const hasDigit = /[0-9]/.test(password);
    const hasCharacter = /[a-zA-Z]/.test(password);
    const hasSymbol = /[^\w\s]/.test(password); // Adjusted regex to not exclude spaces
    const minLength = password.length >= 8;
    setValidpass(hasDigit && hasCharacter && hasSymbol && minLength);
  }, [password]);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      console.log("this is handleLogin function");
      console.log(username, password);

      const response = await axios.post("http://localhost:8080/logIn",{
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        navigate("/adminpanel");
      } else {
        console.log("Access denied!!");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6 text-white text-center font-semibold text-xl tracking-wider">
          Admin Login
        </div>
        <form className="p-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              username
            </label>
            <input
              autoComplete="off"
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              type={showPassword ? "text" : "password"} // Dynamically set input type
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 bottom-15 md:bottom-8 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </span>
            {!Validpass ? (
              <label className="text-red-500" htmlFor="Password">
                Password must contain at least 8 characters, including
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
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
