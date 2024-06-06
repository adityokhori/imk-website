import React from "react";
import OurTeam from "../components/aboutpage/ourteam";
import FirstAbout from "../components/aboutpage/firstAbout";
import VisiMisi from "../components/aboutpage/visimisi";
import SocialMedia from "../components/aboutpage/sosialMedia"

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-20">
      <div className="mt-40">
        <FirstAbout/>
        <OurTeam/>
        <VisiMisi/>
        <SocialMedia/>
      </div>
    </div>
  );
};

export default AboutPage;
