import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Employee Management as a clickable button */}
        <Link
          to="/"
          className="text-2xl font-bold bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800"
        >
          Employee Management
        </Link>
        
        {/* View Employees button */}
        <Link
          to="/employees"
          className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700"
        >
          View Employees
        </Link>
      </div>
    </header>
  );
};

export default Header;
