import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch employees from the backend
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/employees");
        setEmployees(res.data);
      } catch (err) {
        setMessage("Failed to fetch employee data");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Employee List</h1>

        {message && (
          <div className="p-3 text-center bg-red-100 text-red-600 border border-red-300 rounded">
            {message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Employee ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Date of Joining</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.EmployeeID} className="border-t">
                    <td className="px-4 py-2">{employee.EmployeeID}</td>
                    <td className="px-4 py-2">{employee.Name}</td>
                    <td className="px-4 py-2">{employee.Email}</td>
                    <td className="px-4 py-2">{employee.PhoneNumber}</td>
                    <td className="px-4 py-2">{employee.Department}</td>
                    <td className="px-4 py-2">{employee.DateOfJoining}</td>
                    <td className="px-4 py-2">{employee.Role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
