import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="w-[90%] ml-4 mr-4 mt-4 mb-17">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between z-50">
        {/* Left section */}
        <div className="text-xl font-bold text-[#079DD9] cursor-pointer">
          Capture Data
        </div>

        {/* Right section */}
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-[#079DD9]">
            <NavLink
              to="/capture-staffs"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive
                    ? "text-white bg-[#079DD9] border-b-2 border-[#178196]"
                    : "hover:text-[#079DD9]"
                }`
              }
            >
              Staffs
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-[#079DD9]">
            <NavLink
              to="/capture-learners"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive
                    ? "text-white bg-[#079DD9] border-b-2 border-[#178196]"
                    : "hover:text-[#079DD9]"
                }`
              }
            >
              Learners
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-[#079DD9]">
            <NavLink
              to="/capture-facilities"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive
                    ? "text-white bg-[#079DD9] border-b-2 border-[#178196]"
                    : "hover:text-[#079DD9]"
                }`
              }
            >
              Facilities
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
