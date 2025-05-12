//Cart.jsx
import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
// import "./ToastStyles.css";

export default function Cart() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableId");

  const handleCarting = () => {
    if (tableId) {
      navigate(`/carting?tableId=${tableId}`);
    } else {
      alert("Please scan a QR code first.");
      // toast.error("Please scan a Qr code first.", {
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: false,
      //   className: "toast-center",
      // });
    }
  };

  return (
    <div onClick={handleCarting}>
      <img src="./cart.svg" alt=""  className="fixed cursor-pointer border-white border-2 h-13 rounded-4xl right-10 bottom-[5vh] sm:bottom-[10vh] z-10 " />
    </div>

  );
}
