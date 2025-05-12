// Menu_body.jsx
//clear
import Special_eachitem from "./Special_eachitem";
import Veg_eachitem from "./Veg_eachitem";
import Nonveg_eachitem from "./Nonveg_eachitem";
import Drinks_eachitem from "./Drinks_eachitem";

export default function Menu_body({ value }) {
  // Added tableId prop
  return (
    <>
      {/* In this a value 0,1,2,3 comes according to the btn clicked.And as the
      btn clicked the wanted components are rendered using tersary operators
      which is used to operate multiple conditions.The values comes from the
      "Menu_swiper.jsx" file. */}
      {value === 0 ? (
        <div className="Drinks_eachitem-container flex flex-wrap mx-auto  lg:w-[70vw] md:w-[80vw] sm:w-[85vw] ">
          <Special_eachitem />
        </div>
      ) : value === 1 ? (
        <div className="vegitems-container flex flex-wrap mx-auto  lg:w-[70vw] md:w-[80vw] sm:w-[85vw] ">
          <Veg_eachitem />
        </div>
      ) : value === 2 ? (
        <div className="vegitems-container flex flex-wrap mx-auto  lg:w-[70vw] md:w-[80vw] sm:w-[85vw] ">
          <Nonveg_eachitem />
        </div>
      ) : value === 3 ? (
        <div className="vegitems-container flex flex-wrap mx-auto  lg:w-[70vw] md:w-[80vw] sm:w-[85vw] ">
          <Drinks_eachitem />
        </div>
      ) : null}
      
    </>
  );
}
