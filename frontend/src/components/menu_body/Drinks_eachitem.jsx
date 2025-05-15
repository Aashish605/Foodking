// Drinks_eachitem.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Special_eachitem() {

  const [Item, setItem] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableId");

  const notify = (name) => {
    if (tableId) {
      toast.success(`${name} Added To Cart`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    }
    else {
      toast.error("Scan The Qr Code", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/database");
        const filterResponse = response.data.filter((item) => item.category === "Drinks")
        setItem(filterResponse.map(item => ({ ...item, Quantity: 1 })));
        console.log(filterResponse.map(item => ({ ...item, Quantity: 1 })));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="h-[50vh] w-full flex items-center justify-center text-3xl ">Loading...</div>;
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  }

  if (Item.length === 0) {
    return <div>No drinks items found.</div>; // Handle empty state
  }

  const handleAdd_To_Cart = (productname, price,Quantity) => {
    const item = {
      productname,
      price,
      tableId,
      Quantity,
    };

    const existingOrders = JSON.parse(localStorage.getItem("cart")) || {};
    const tableCart = existingOrders[tableId] || [];
    const existingItem = tableCart.find(e => e.productname === item.productname)
    console.log(existingItem, "exist");
    if (existingItem) {
      existingItem.Quantity += Quantity ;
    }
    else {
      tableCart.push(item)
    }
    const updatedOrders = {
      ...existingOrders,
      [tableId]: tableCart,
    };
    localStorage.setItem("cart", JSON.stringify(updatedOrders));
    console.log("updated cart", tableCart);
  };

  const updateQuantity = (id,amount) => {
    const updatedItems = Item.map(element => {
      if (element._id === id) {
        return { ...element, Quantity: element.Quantity + amount }; 
      }
      return element; 
    });
    setItem(updatedItems); 
  };

  return (
    <>
      <div className=" w-full text-2xl mx-3 mt-6 sm:mx-0 ">DRINKS</div>
      <div className=" flex flex-wrap items-center mb-6 mx-3 sm:mx-0  ">
        {Item.map((item) => (
          <div
            key={item._id}
            className="Eachitem-container group border-gray-400 border-1 border-dashed overflow-hidden bg-gray-100 p-1  my-4 w-[42vw] 
          sm:w-[30vw] md:w-[22vw] lg:w-[15vw] max-[320px]:w-[41vw] max-[320px]: mr-3 sm:mr-8 md:mr-6 lg:mr-4 "
          >
            <div className="Eachitem-photo flex  justify-center overflow-hidden ">
              <img
                className=" h-[20vh] object-center object-contain   group-hover:scale-105 duration-500"
                src={
                  item.productname === "Dew"
                    ? "/drinkimg/Dew.webp"
                    : item.productname === "Fanta"
                      ? "/drinkimg/Fanta.webp"
                      : item.productname === "Frooti"
                        ? "/drinkimg/Frooti.webp"
                        : item.productname === "Mineral-Water"
                          ? "/drinkimg/Mineral-Water.webp"
                          : "/drinkimg/Real-Juice.webp"
                }
                alt="loading"
              />
            </div>
            <div className="Eachitem-name text-center  mt-4 sm:text-xl  ">
              {item.productname}
            </div>
            <div className=" flex flex-col items-center  my-1">
              <button
                className="bg-black text-white px-3 py-2 w-fit my-3 rounded-md hover:cursor-pointer"
                onClick={() => {
                  handleAdd_To_Cart(item.productname, item.price,item.Quantity);
                  notify(item.productname);
                }}
              >
                Add to cart

              </button>
              <label className="font-semibold mt-2" htmlFor="quantity">Quantity :           <input
                className=" w-[12vw] sm:w-[8vw] lg:w-[4vw]  text-center outline-0  rounded-sm border-1 appearance-none "
                type="number"
                min={1}
                placeholder={item.Quantity}
                onChange={(e)=>updateQuantity(item._id,e.target.value-item.Quantity)}
              /></label>
            </div>
            <div className="Eachitem-cart flex justify-around px-1">
              <span className="Eachitem-price my-2 opacity-70 text-sm ">Rs {item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
