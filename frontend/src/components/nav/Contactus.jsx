//Contactus.jsx
//clear
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
export default function Contactus() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <Nav />
      <div className="md:p-6 p-4">
        <h1 className="flex justify-center items-center font-bold text-3xl">
          Contact Us
        </h1>
        <p className="px-5 py-10 md:px-3 md:py-5">
          Here is the information you needed.
        </p>

        <button
          className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded hover:cursor-pointer ml-5 md:ml-2"
          onClick={() => handleBack()}
        >
          Back
        </button>
      </div>
    </>
  );
}
