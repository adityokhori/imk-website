import React from "react";
import Button from "../components/Button/button";

const LandingPage = () => {
  return (
    <div className="flex justify-center flex-row items-center min-h-screen p-5">
      <div className="w-1/2 text-center">
        <h1 className="text-5xl font-bold">Get the FREE</h1>
        <h1 className="text-6xl font-bold text-orange-800">ESSENTIAL</h1>
        <h1 className="text-5xl font-bold">eBook</h1>
        <div className="flex flex-col text-start p-10">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            dolore odio ipsum alias sed soluta? Fugit, officia autem? Nihil
            molestiae id expedita aliquam quo. Nulla, quaerat nemo? Incidunt,
            nisi praesentium?
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            dolore odio ipsum alias sed soluta? Fugit, officia autem? Nihil
            molestiae id expedita aliquam quo. Nulla, quaerat nemo? Incidunt,
            nisi praesentium?
          </p>
          <div className="flex flex-row justify-between mt-5 ">
            <div className="flex flex-col">
              <Button stats="text-black border border-black px-2 py-1" to={"/book"}>
                Browser
              </Button>
              <Button stats="text-black border border-black px-2 py-1 mt-2 " to={"/book"}>
                Download your FREE eBook
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <Button stats="text-black border border-black px-8 py-2 " to={"/register"}>
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 object-cover">
        <img src="https://picsum.photos/seed/picsum/800/500"/>
      </div>
    </div>
  );
};

export default LandingPage;
