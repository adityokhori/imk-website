import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase-config";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  const signin = async () => {
    try {
      console.log("otw login");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("beres login");
    } catch (error) {
      console.log("error login", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/book");
    } catch (error) {
      console.error("error sign in with Google", error);
    }
  };

  const forgotPassword = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await signin();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        if (currentUser.emailVerified) {
          console.log("verified");
          console.log("beres login");
          navigate("/book");
        } else {
          console.log("belum verified");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label for="check" className="ml-2">Show Password</label>

            <h3
              className="flex justify-end items-end m-1 text-sm cursor-pointer"
              onClick={forgotPassword}
            >
              Forgot Password?
            </h3>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-800 text-white py-2 px-4 rounded-md hover:bg-orange-900 focus:outline-none"
            >
              Login
            </button>
            <div className="mt-5 flex justify-center items-center">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="  flex flex-row items-center px-2 text-black rounded-md py-2 hover:bg-slate-200"
              >
                <FaGoogle className="w-6 h-5 mr-2" />
                Sign In with Google
              </button>
            </div>
            <Link to="/register">
              <div className="mt-5 flex justify-center items-center">
                <button
                  type="button"
                  className="text-center w-full px-2 border border-black text-black rounded-md py-2 hover:bg-slate-200"
                >
                  Sign Up
                </button>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
