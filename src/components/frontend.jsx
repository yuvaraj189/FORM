import React, { useState } from "react";
import axios from "axios";

const Frontend = () => {
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
    Department: "",
    DateOfJoining: "",
    DateOfBirth: "",
    Role: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"];
  const roles = ["Manager", "Developer", "Designer", "HR Specialist", "Accountant"];

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "EmployeeID":
        if (!value || value.length > 10) error = "Employee ID must be <= 10 characters.";
        break;
      case "Name":
        if (!value) error = "Name is required.";
        break;
      case "Email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email.";
        break;
      case "PhoneNumber":
        if (value.length !== 10 || !/^[0-9]+$/.test(value)) error = "Phone number must be 10 digits.";
        break;
      case "Department":
        if (!value) error = "Department is required.";
        break;
      case "DateOfBirth":
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (!value) error = "Date of Birth is required.";
        else if (age < 18) error = "Employee must be at least 18 years old.";
        break;
      case "DateOfJoining":
        if (!value) error = "Date of Joining is required.";
        else if (new Date(value) > new Date()) error = "Date cannot be in the future.";
        break;
      case "Role":
        if (!value) error = "Role is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post("http://localhost:5000/employees", formData);
        setMessage(res.data.message || "Employee added successfully!");
        setErrors({});
        setFormData({
          EmployeeID: "",
          Name: "",
          Email: "",
          PhoneNumber: "",
          Department: "",
          DateOfJoining: "",
          DateOfBirth: "",
          Role: "",
        });
      } catch (err) {
        setMessage(err.response?.data?.message || "Submission failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Add New Employee</h1>

        {message && (
          <div className="p-3 text-center bg-green-100 text-green-600 border border-green-300 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData).map((field) => (
            <div key={field} className="space-y-1">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "Department" || field === "Role" ? (
                <select
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">
                    Select {field.replace(/([A-Z])/g, " $1")}
                  </option>
                  {(field === "Department" ? departments : roles).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field.includes("Date") ? "date" : "text"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  className={`block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                />
              )}
              {errors[field] && (
                <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Frontend;
