import React, { useState } from 'react';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Check if  credentials match .env
    if (username === adminUsername && password === adminPassword) {
      const token = 'admin-token-12345';
      
      // Store the token
      localStorage.setItem('token', token);
      
      // Update the app's token state
      setToken(token);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button 
              type="submit"
              className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-950 transition duration-200 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
