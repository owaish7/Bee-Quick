import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
// import Register from './Register';

function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validation checks
    let isValid = true;

    if (email === '') {
      isValid = false;
      setEmailError('The email field is required');
    }

    if (password === '') {
      isValid = false;
      setPasswordError('The password field is required');
    }

    if (isValid) {
      const formData = {
        emp_id: email,
        pwd: password,
      }
      console.log(formData)
      // Implement your login logic here
      // You can use a library like Firebase for authentication
      try {
        await login(formData, 'Driver');
        console.log("Login done")
        navigate('/drive')
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-300 to-amber-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 transform transition-transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-black mb-6 font-serif">
          Partner Login
        </h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-amber-300"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-amber-300"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <Link to="/Drive">
          <button
            onClick={handleLogin}
            className="w-full bg-black text-amber-300 font-semibold py-3 rounded-md hover:bg-gray-900 focus:ring focus:ring-amber-400"
          >
            Log In
          </button>
        </Link>
        <div className="mt-4 text-center text-black">
          Don't have an account? <a href="/EmpRegister" className="text-amber-300 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default DriverLogin;