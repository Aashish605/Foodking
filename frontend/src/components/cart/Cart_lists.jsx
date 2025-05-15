//carts lists
import React, { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Cart_lists() {
  const [eachtotal, setEachtotal] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableId");

  useEffect(() => {
    if (!tableId) {
      console.error("tableId is missing from URL.");
      return;
    }

    try {
      const storedCarts = localStorage.getItem("cart");
      if (storedCarts) {
        const parsedCarts = JSON.parse(storedCarts);
        if (parsedCarts && parsedCarts[tableId]) {
          setcartItems(parsedCarts[tableId]);
        }
      }
    } catch (error) {
      console.error("Error in showing data", error);
    }
  }, [tableId]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const totals = cartItems.map((item) => item.price * item.Quantity);
      setEachtotal(totals);
    } else {
      setEachtotal([]);
    }
  }, [cartItems]);

  const calculateTotal = () => {
    if (Array.isArray(eachtotal)) {
      return eachtotal.reduce((sum, total) => sum + total, 0);
    } else {
      console.error("eachtotal is not an array:", eachtotal);
      return 0;
    }
  };

  const removeCart = (itemNameToRemove) => {
    try {
      const storedCarts = localStorage.getItem("cart");
      if (storedCarts) {
        const parsedCarts = JSON.parse(storedCarts);
        if (parsedCarts && parsedCarts[tableId]) {
          let cart = parsedCarts[tableId].filter(
            (item) => item.productname !== itemNameToRemove
          );
          parsedCarts[tableId] = cart;
          localStorage.setItem("cart", JSON.stringify(parsedCarts));
          setcartItems(cart);
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleOrderAll = async () => {
    try {
      setIsOrdering(true);
      const totalAmount = calculateTotal();
      await axios.post("https://foodking-s5cg.vercel.app/saveorders", {
        items: cartItems,
        totalAmount: totalAmount,
        tableId: tableId,
      });

      const storedCarts = JSON.parse(localStorage.getItem("cart") || "{}");
      if (storedCarts[tableId]) {
        delete storedCarts[tableId];
        localStorage.setItem("cart", JSON.stringify(storedCarts));
      }
      setcartItems([]);
      setEachtotal([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error occurs while placing an order!!!");
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    } finally {
      setIsOrdering(false);
    }
  };






  return (
    <>
      {console.log("cartItems:", cartItems)}
      <div className="p-4 min-h-[50vh]  md:p-6 lg:p-8">
        <h1 className="text-xl font-bold text-center mb-4 md:text-2xl lg:text-3xl">
          Your Cart for Table: {tableId}
        </h1>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          <div className="overflow-x-auto lg:w-5/10 m-auto rounded-lg shadow">
            <table className="w-5/10 lg:w-8/10 bg-white m-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
                    SN
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
                    Item
                  </th>
                  <th className="py-3 px-4 border-b text-right text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
                    Qty
                  </th>
                  <th className="py-3 px-4 border-b text-right text-sm font-semibold text-gray-600">
                    Total
                  </th>
                  <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  // const itemTotal = item.price * item.Quantity;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-sm text-gray-800">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b text-sm text-gray-800">
                        {item.productname}
                      </td>
                      <td className="py-2 px-4 border-b text-right text-sm text-gray-800">
                        Rs {item.price}
                      </td>
                      <td className="py-2 px-4 border-b text-left text-sm text-gray-800">
                        {item.Quantity}
                      </td>
                      <td className="py-2 px-4 border-b text-right text-sm text-green-600">
                        Rs {item.price * item.Quantity}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs md:text-sm"
                          onClick={() => removeCart(item.productname)}
                        >
                          Remove
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-4 font-semibold text-right text-sm md:text-base text-gray-700"
                  >
                    Total Amount:
                  </td>
                  <td className="py-3 px-4 font-semibold text-right text-sm md:text-base text-green-600">
                    Rs {calculateTotal().toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 italic text-center mt-4">
            Your cart is empty.
          </p>
        )}
        <div className="mt-6 flex justify-center ">
          <button
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
            onClick={handleOrderAll}
            disabled={isOrdering}
          >
            {isOrdering ? "Ordering..." : "Order All"}
          </button>
        </div>
      </div >
    </>
  );
}
