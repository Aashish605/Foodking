import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add_Items() {
  const navigate = useNavigate();

  const [formdata, Setformdata] = useState({
    category: "Veg",
    productname: "",
    price: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response = axios.post(
        "https://foodking-s5cg.vercel.app/additems",
        formdata
      );
      alert("Item is added");
      console.log("Server response", response.data);
      navigate("/additems");
      Setformdata({ category: "", productname: "", price: 0 });
    } catch (error) {
      alert("Error during Item saving");
      console.error("Error during item saving", error);
    }
  };
  const handleCategorychange = (event) => {
    Setformdata((currData) => {
      return { ...currData, category: event.target.value };
    });
  };

  const handleChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;
    Setformdata((currData) => {
      return { ...currData, [fieldName]: newValue };
    });
  };

  const handleBack = () => {
    navigate("/"); //Navigate back the home page
  };

  return (
    <>
      <h1 className="flex justify-center items-center pt-5 font-semibold text-3xl underline">
        This is Add Items
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Choose your category
          </label>
          <select
            onChange={handleCategorychange}
            value={formdata.category}
            id="category"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
          >
            <option value="Veg">Veg</option>
            <option value="Nonveg">Nonveg</option>
            <option value="Drinks">Drinks</option>
            <option value="SpecialItems">SpecialItems</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="productname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name:
          </label>
          <input
            type="text"
            name="productname"
            value={formdata.productname}
            onChange={handleChange}
            id="productname"
            placeholder="Enter product name"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            name="price"
            value={formdata.price}
            onChange={handleChange}
            type="number"
            id="price"
            placeholder="Enter price"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
        >
          Submit
        </button>
      </form>

      <button
        className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded hover:cursor-pointer ml-5 md:ml-2 mt-5"
        onClick={() => handleBack()}
      >
        Back
      </button>
    </>
  );
}
