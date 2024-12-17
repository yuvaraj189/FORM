import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontend from "./components/Frontend"; // Add Employee form
import EmployeeList from "./components/EmployeeList"; // View Employees page
import Header from "./components/Header"; // Header with View Employees button
import Footer from "./components/Footer"; // Footer component

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Frontend />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
