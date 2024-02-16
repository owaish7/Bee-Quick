import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRoot() {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const handleLogin = () => {
    if (selectedUserType === 'customer') {
      navigate('/login');
    } else if (selectedUserType === 'driver') {
      navigate('/driverlogin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-amber-400 via-amber-300 to-amber-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 transform transition-transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-black mb-6 font-serif">
          BeeQuick Login
        </h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2">Login as:</label>
          <div>
            <input
              type="radio"
              id="customer"
              name="userType"
              value="customer"
              onChange={handleUserTypeChange}
            />
            <label htmlFor="customer" className="ml-2">
              Customer
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="driver"
              name="userType"
              value="driver"
              onChange={handleUserTypeChange}
            />
            <label htmlFor="driver" className="ml-2">
              Partner
            </label>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className={`w-full bg-black text-yellow-300 font-semibold py-3 rounded-md hover:bg-gray-900 focus:ring focus:ring-yellow-400 ${
            !selectedUserType ? 'hidden' : ''
          }`}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginRoot;