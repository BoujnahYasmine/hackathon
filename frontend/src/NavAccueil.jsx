import React from "react";
import { NavLink } from "react-router-dom";

const NavAccueil = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="./src/assets/1.png" 
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="font-bold text-xl text-gray-800">ConnectNet</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8">
        <NavLink to="/accueil" className={linkClass}>
          Accueil
        </NavLink>
        <NavLink to="/list" className={linkClass}>
          Activities
        </NavLink>
        <NavLink to="/add-activity" className={linkClass}>
          Add Activity
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact Us
        </NavLink>
      </div>

      {/* Login button */}
      <div>
        <NavLink
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavAccueil;
