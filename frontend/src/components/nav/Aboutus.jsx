//About.jsx

export default function Aboutus() {
  return (
    <>
      <div className="md:p-6 p-4">
        <div className="px-5 py-10 flex flex-wrap md:px-3 md:py-5 text-gray-700 items-center justify-around gap-10 ">
          {/* Image Section */}
          <div className="w-[550px] flex justify-center">
            <img
              src="hotel.png"
              alt="Hotel"
              className=" rounded-lg shadow-lg object-center  object-cover"
            />
          </div>
          {/* Text Section */}
          <div className="w-[390px]  grow text-justify min-[1108px]:grow-0 ">
            <p className="text-center text-3xl font-semibold mb-10">Foodking Pvt Ltd</p>
            <p className="mb-4">
              With 25 years of experience in the hospitality sector, Foodking Business Group of Hospitality Foodking stands as one of Nepal's rapidly expanding chains in this industry. SBGH's journey began modestly in 1998 with a fast-food cafe in Tikapur, led by Mr. Laxman Neupane, the chairperson, who has since set a remarkable standard for hospitality in Nepal.
            </p>
            <p className="mb-4">
              As a prominent player in the hospitality arena, Foodking has diversified its presence with various branches encompassing hotels, a training institute, cafes, bakeries, a hospitality trade center, and an ongoing expansion into luxurious hotels and resorts. Over these 25 years, SBGH continues to evolve, committed to delivering exceptional experiences to its patrons, embodying the ethos of "Hospitality from the heart."
            </p>
            <p>
              Yet, the journey of success doesn't conclude here; SBGH has ambitious plans for the future. These encompass expanding its portfolio with new projects that continually bring novel and unexpected experiences to their customers' tables.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
