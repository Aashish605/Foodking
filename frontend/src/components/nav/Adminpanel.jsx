// Adminpanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminOrderList from "./AdminOrderList";

export default function Adminpanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmedOrderIds, setConfirmedOrderIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://foodking-s5cg.vercel.app/getorders");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-3">Loading order data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h2 className="text-xl font-semibold mb-2">Error Loading Orders</h2>
        <p>{error.message}</p>
        {error.response && (
          <div>
            <p>Status: {error.response.status}</p>
            {error.response.data && (
              <pre className="mt-2">
                {JSON.stringify(error.response.data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    );
  }

  const handleConfirmPayment = async (orderId) => {
    try {
      await axios.post("https://foodking-s5cg.vercel.app/confirm-payment", {
        orderId,
      });
      setConfirmedOrderIds((prevSet) => new Set(prevSet).add(orderId));
    } catch (err) {
      console.error("Error confirming payment:", err);
      alert("Failed to confirm payment. Check console.");
    }
  };

  const handlePaid = async (orderId) => {
    if (!confirmedOrderIds.has(orderId)) {
      alert("Order must be confirmed before marking as paid.");
      return;
    }
    try {
      await axios.patch(`https://foodking-s5cg.vercel.app/orders/${orderId}/paid`, {
        paid: true,
      });
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, paid: true } : order
        )
      );
      setConfirmedOrderIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(orderId);
        return newSet;
      });
    } catch (err) {
      console.error("Error marking order as paid:", err);
      alert("Failed to mark order as paid.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="lg:text-2xl text-xl text-center  font-bold my-4">
        Admin Panel - Order Management
      </h1>
      {data.length > 0 ? (
        <AdminOrderList
          orders={data}
          confirmedOrderIds={confirmedOrderIds}
          handleConfirmPayment={handleConfirmPayment}
          handlePaid={handlePaid}
        />
      ) : (
        <div className="text-gray-600 italic">No orders found.</div>
      )}
    </div>
  );
}
