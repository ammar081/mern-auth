import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-8 px-72">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">MERN Authentication</h2>
        <p className="text-gray-600">
          This is a boilerplate for MERN authentication that stores a JWT in an
          HTTP-Only cookie. It also uses Redux Toolkit and the React Bootstrap
          library
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link to="/login">
            <button className="flex px-4 py-1.5 rounded items-center bg-indigo-500 text-white gap-1.5">
              <FaSignInAlt /> Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="flex px-4 py-1.5 rounded items-center bg-gray-600 text-white gap-1.5">
              <FaSignOutAlt /> Sign Up
            </button>
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default Hero;
