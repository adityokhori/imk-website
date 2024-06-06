import React from "react";
import { MdPerson } from "react-icons/md";

const OurTeam = () => {
  return (
    <div>
      <div className="flex justify-center font-bold text-5xl text-center font-[Poppins] text-gray-800 mt-40">
        Meet Our Team
      </div>
      <div className="flex justify-center items-center text-black font-semibold px-20 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 ">
          <div className="m-2 flex flex-col justify-center items-center">
            <img
              src="src/assets/adit-clear.png"
              className="w-4/5 bg-orange-200"
            />
            <div className="flex flex-col justify-center items-start mt-2">
              <h2>Adityo Khori Ramadhan</h2>
              <h2 className="text-gray-500">
                Project Manager, Backend Developer
              </h2>
            </div>
          </div>
          <div className=" m-2 flex flex-col ljustify-center items-center">
            <img
              src="src/assets/rizki-clear.png"
              className="w-4/5 bg-orange-200"
            />
            <div className="flex flex-col justify-center items-start  mt-2">
              <h2>M. Rizki Fahriza Bailey</h2>
              <h2 className="text-gray-500">
                Frontend Developer, UI/UX Designer
              </h2>
            </div>
          </div>
          <div className=" m-2 flex flex-col justify-center items-center">
            <MdPerson className="w-4/5 h-full bg-orange-200"/>
            <div className="flex flex-col justify-center items-start  mt-2">
              <h2>Rafli Hidayat</h2>
              <h2 className="text-gray-500">
                Quality Assurance, Content Manager
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
