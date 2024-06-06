import React from "react";
import { motion } from "framer-motion";

const FirstAbout = () => {
  return (
    <div>
      <motion.div
        className="font-bold text-8xl text-center font-[Poppins] text-gray-800"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
      >
        eBoo<span className="text-orange-800">Kita.</span>
      </motion.div>
      <motion.div
        className="flex justify-center text-2xl text-black font-semibold mt-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
      >
        <h2>
          eBooKita is a digital platform that provides free access to thousands
          of ebooks from various genres and authors around the world. We use the
          API from gutendex.com to collect a collection of quality electronic
          books that can be accessed by everyone at no cost. <br />
          <br />
          At eBooKita, we believe that reading is everyone's right and should
          not be hindered by financial limitations. Therefore, our mission is to
          provide a platform that allows anyone to enjoy the best books for
          free, anytime and anywhere. With an easy-to-use interface and
          comfortable reading experience, we hope to encourage more people to
          love books and broaden their horizons.
        </h2>
      </motion.div>
    </div>
  );
};

export default FirstAbout;
