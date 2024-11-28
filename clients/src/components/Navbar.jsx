import React from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

const Navbar = function () {
  return (
    <div className="z-10">
      <div className="flex justify-between items-center py-5 px-6 lg:px-20 border-b-2 rounded-b-xl">
        <Link to="/" className="font-bold text-black sm:text-xl hover:underline">
          HOME
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/signup"
            className="py-1 px-2 sm:py-2 sm:px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-950"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="py-1 px-3 sm:py-2 sm:px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-950"
          >
            Login
          </Link>
          <Link to="/task">
          <i className="ri-user-fill text-3xl sm:text-4xl"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
