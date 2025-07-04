import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-medium border-b-2 border-indigo-500 pb-2 transition-all duration-300 ease-in-out"
      : "text-gray-600 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-200 pb-2 transition-all duration-300 ease-in-out";

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-center items-center space-x-10 sticky top-0 z-50">
      <NavLink to="/activities" className={linkClass}>
        Activity List
      </NavLink>
      <NavLink to="/add-activity" className={linkClass}>
        Add Activity
      </NavLink>
    </nav>
  );
};

export default Navbar;