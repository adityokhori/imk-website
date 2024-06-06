import React from "react";

const VisiMisi = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-20 text-center">
        <h1 className="text-5xl  font-[Poppins] text-gray-800 font-bold">
          Vision & Mission
        </h1>
        <p className="mt-5 text-xl font-semibold text-gray-400">What are we doing, and why are we doing it.</p>
      </div>
      <div className="flex flex-row justify-between items-center mt-5 shadow-md p-8 border-2 border-inherit">
        <div className="flex flex-col justify-center items-center w-1/2 mr-auto">
          <h1 className="font-bold text-5xl font-[Poppins] text-gray-800">
            Our Vision
          </h1>
          <p className="text-2xl mt-2">
            Our vision is to become the leading platform in providing free
            access to quality electronic books for the entire community.
          </p>
        </div>
        <img src="src/assets/reader.jpg" />
      </div>
      <div className="flex flex-row justify-between items-center mt-10 shadow-md p-8 border-2 border-inherit">
        <img src="src/assets/all-device.png" className="w-2/5" />

        <div className="mt-10 flex flex-col justify-center w-1/2 ml-auto ">
          <h1 className="text-center font-bold text-5xl font-[Poppins] text-gray-800">
            Our Mission
          </h1>
          <div className="text-2xl mt-2">
            <li>
              Provides easy and free access to ebooks from various genres.
            </li>
            <li>
              Supporting a culture of reading and education through technology.
            </li>
            <li>Providing a user-friendly and informative platform.</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
