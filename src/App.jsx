import React from 'react';
import './App.css';
import Frontend from './components/frontend'; // Import the form component

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white text-center p-4">
        <h1 className="text-3xl font-bold">Employee Management System</h1>
      </header>

      <main className="flex justify-center items-center mt-8">
        {/* Embed the employee form */}
        <Frontend />
      </main>

      <footer className="bg-blue-500 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Employee Management System</p>
      </footer>
    </div>
  );
}

export default App;
