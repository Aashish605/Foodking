// components/AdminOrderList.jsx
import React from "react";
export default function AdminOrderList({
  orders,
  confirmedOrderIds,
  handleConfirmPayment,
  handlePaid,
}) {
  return (
    <div className="w-full overflow-x-auto text-center min-h-[40vh] ">
      <table className="w-3/5 bg-white shadow-md rounded-lg m-auto">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="py-2 px-3 border-b text-left text-sm md:text-base">Order ID</th> */}
            <th className="py-2 px-12 lg:px-5 border-b text-left text-sm md:text-base">
              Table ID
            </th>
            <th className="py-2 px-12 lg:px-5 border-b text-right text-sm md:text-base">
              Total Amount
            </th>
            <th className="py-2 px-12 lg:px-5 border-b text-left text-sm md:text-base">
              Order Date
            </th>
            <th className="py-2 px-12 lg:px-5 border-b text-left text-sm md:text-base">
              Items
            </th>
            <th className="py-2 px-12 lg:px-5 border-b text-center text-sm md:text-base">
              Payment Status
            </th>
            <th className="py-2 px-12 lg:px-5 border-b text-center text-sm md:text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              {/* <td className="py-1 px-3 border-b font-semibold text-sm md:text-base">{order._id}</td> */}
              <td className="py-1 px-2 border-b text-sm md:text-base">
                {order.tableId}
              </td>
              <td className="py-1 px-2 border-b  text-sm md:text-base">
                <span className="font-semibold">Rs</span> {order.totalAmount}
              </td>
              <td className="py-1 px-2 border-b text-sm md:text-base">
                {new Date(order.OrderDate).toLocaleString("en-NP", {
                  timeZone: "Asia/Kathmandu",
                  // year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  // second: "numeric",
                })}
              </td>
              <td className="py-1 px-2 border-b text-sm md:text-base">
                <ul className="list-disc pl-4 text-xs md:text-sm">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-[1.1rem]">
                      <span className="font-medium">
                        {item.Quantity}-{item.productname}
                      </span>{" "}
                      {/* - <span>Rs {item.price}</span> */}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-1 px-2 border-b text-center text-sm md:text-base">
                {order.paid ? (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full md:text-sm">
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full md:text-sm">
                    Pending
                  </span>
                )}
              </td>
              <td className="py-1 px-2 border-b text-center text-sm md:text-base">
                {!order.paid && (
                  <div className="flex justify-center space-x-1 md:space-x-2">
                    <button
                      className={`bg-blue-500 text-white rounded-md px-2 py-0.5 text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed ${confirmedOrderIds.has(order._id)
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                        }`}
                      onClick={() => handleConfirmPayment(order._id)}
                      disabled={confirmedOrderIds.has(order._id)}
                    >
                      {confirmedOrderIds.has(order._id)
                        ? "Confirmed"
                        : "Confirm"}
                    </button>
                    <button
                      className={`bg-green-500 text-white rounded-md px-2 py-0.5 text-xs hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed ${!confirmedOrderIds.has(order._id)
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                        }`}
                      onClick={() => handlePaid(order._id)}
                      disabled={!confirmedOrderIds.has(order._id)}
                    >
                      Mark Paid
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
