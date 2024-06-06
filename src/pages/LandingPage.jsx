import React, { useState, useEffect } from "react";
import Button from "../components/Button/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [buttonLink, setButtonLink] = useState("/login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
        setButtonLink("/book");
      } else {
        setButtonLink("/register");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center flex-row items-center min-h-screen p-8 overflow-hidden">
      <motion.div
        className="w-1/2 text-center "
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold">Get the FREE</h1>
        <h1 className="text-6xl font-bold text-orange-800">ESSENTIAL</h1>
        <h1 className="text-5xl font-bold">e-Book</h1>
        <div className="flex flex-col text-start p-10">
          <p>
            Enjoy thousands of free ebooks with eBooKita! We offer a collection
            of high-quality electronic books from various genres that are
            accessible to everyone. From timeless classics to modern
            masterpieces, you'll find and read them all for free here. With our
            user-friendly interface, we ensure a comfortable and enjoyable
            reading experience for every user.
          </p>
          <br />
          <p>
            Don't miss the chance to expand your horizons and knowledge at no
            cost. Click the "Explore" button to start browsing our collection or
            "Register Now" to join the eBooKita community and enjoy exclusive
            features. Let's support the reading culture together and make the
            world more knowledgeable!
          </p>
          <div className="flex flex-row justify-between mt-5 ">
            <div className="flex flex-col">
              <Button
                stats="text-white bg-orange-800 px-8 py-2 mt-2 hover:bg-orange-700 hover:border-white"
                to={"/book"}
              >
                Explore
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <Button
                stats="text-black border border-black px-8 py-2 hover:bg-slate-400 hover:border-white"
                to={buttonLink}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-1/2 flex justify-center items-center "
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
      >
        <img src="src/assets/mockup2.png" alt="Landing" className="w-10/12"/>
      </motion.div>
    </div>
  );
};

export default LandingPage;
