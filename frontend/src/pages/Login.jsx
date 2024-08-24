import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (email === '') {
      isValid = false;
      setEmailError('The field is required');
    }

    if (password === '') {
      isValid = false;
      setPasswordError('The field is required');
    }

    if (isValid) {
      const formData = {
        userid: email,
        pwd: password,
      };
      try {
        await login(formData, 'User');
        console.log("Login successful");
        navigate('/Rent');
      } catch (err) {
        const message = err.response?.data?.message || 'An error occurred. Please try again.';
        setErr(message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-300 to-amber-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 transform transition-transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-black mb-6 font-serif">
          Customer Login
        </h2>
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name='email'
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
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
              name='password'
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-yellow-300 font-semibold py-3 rounded-md hover:bg-gray-900 focus:ring focus:ring-yellow-400"
        >
          Log In
        </button>
        <div className="mt-4 text-center text-black">
          Don't have an account? <a href="/Register" className="text-yellow-300 hover:underline">Sign up</a>
        </div>
        {err && <p className="text-red-500 text-center mt-4">{err}</p>}
      </div>
    </div>
  );
}

export default Login;
