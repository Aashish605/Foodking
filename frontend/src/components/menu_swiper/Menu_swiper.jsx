import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Menu_body from "../menu_body/Menu_body";
import { useState } from "react";
import 'swiper/css';
// import { useSearchParams } from "react-router-dom";

export default function Menu_swiper() {
  const [items, setItems] = useState(0);
  // const [searchParams] = useSearchParams();
  // const tableId = searchParams.get("tableId");

  const orderlists = (num) => {
    setItems(num);
  };

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  return (
    <>
      <div className=" lg:w-[70vw] md:w-[80vw] sm:w-[85vw] mx-auto">
      <div className="flex justify-center  z-0 items-center text-black-600  text-3xl ">
        <div className="">
          <img src="./Food.png" alt="" className="blur-[1px] w-full lg:h-[70vh] md:h-[75vh] h-[50vh] px-2 object-cover object-left   " />
        </div>
      </div>
      <div>
        <p className="text-xs mt-3 opacity-70 text-center">MADE WITH LOVE</p>
        <p className="text-center  font-semibold">BROWSE FOOD CATEGORIES</p>
      </div>
      <Swiper
        className=" my-8 w-[95vw] lg:w-[70vw] md:w-[80vw] sm:w-[85vw]  h-[50vw] sm:h-[40vw] md:h-[30vw] lg:h-[45vh] "
        loop={'true'}
        spaceBetween={10}
        breakpoints={{
          0: {
              slidesPerView: 2.5,
          },
          480: {
              slidesPerView: 3,
          },
        }}
        modules={[Navigation, Pagination]}
        // navigation ={true}
        // pagination={true}
      >
        <SwiperSlide className=" relative group overflow-hidden border-1 border-gray-400 border-dashed bg-gray-100 ">
          <div >
            <img
              className=" h-[35vh] max-sm:h-[20vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 ease-in-out duration-700 "
              src="images/Today.png"
              alt="loading"
            />
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base  sm:py-2 sm:px-4 hover:cursor-pointer"
              onClick={() => orderlists(0)}
            >
              Today's special
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" relative group overflow-hidden border-1 border-gray-400 border-dashed bg-gray-100 ">
          <div >
            <img
              className="h-[27vh] px-2 max-sm:py-8   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
              src="images/Veg.png"
              alt="loading"
            />
            <button
              className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
              onClick={() => orderlists(1)}
            >
              Veg set
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" relative group overflow-hidden border-1 border-gray-400 border-dashed bg-gray-100 ">
          <div>
            <img
              className=" h-[23vh] px-2 max-sm:py-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
              src="images/Nonveg.png"
              alt="loading"
            />
            <button
              className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
              onClick={() => orderlists(2)}
            >
              Nonveg set
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" relative group overflow-hidden border-1 border-gray-400 border-dashed bg-gray-100 ">
          <div >
            <img
              className="h-[35vh] max-sm:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
              src="images/Drinks.png"
              alt="loading"
            />
            <button
              className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
              onClick={() => orderlists(3)}
            >
              Drinks
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
      <Menu_body value={items}  />
      </div>
    </>
  );
}


