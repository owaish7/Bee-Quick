import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [err, setErr] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [residence, setResidence] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [residenceError, setResidenceError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [roleError, setRoleError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePhoneNumberChange = (value) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length !== 10) {
      setPhoneNumberError('Phone number should only be of 10 digits');
    } else {
      setPhoneNumberError('');
    }

    setPhoneNumber(numericValue);
  };

  const handleRegister = async (event) => {
    event.preventDefault()
    let isValid = true;

    if (name === '') {
      isValid = false;
      setNameError('This field is required');
    } else {
      setNameError('');
    }

    if (email === '') {
      isValid = false;
      setEmailError('This field is required');
    } else if (!validateEmail(email)) {
      isValid = false;
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }

    if (password === '') {
      isValid = false;
      setPasswordError('This field is required');
    } else if (password.length < 8) {
      isValid = false;
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '') {
      isValid = false;
      setConfirmPasswordError('This field is required');
    } else if (password !== confirmPassword) {
      isValid = false;
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError('');
    }

    if (gender === '') {
      isValid = false;
      setGenderError('This field is required');
    } else {
      setGenderError('');
    }

    if (residence === '') {
      isValid = false;
      setResidenceError('This field is required');
    } else {
      setResidenceError('');
    }

    if (age === '') {
      isValid = false;
      setAgeError('This field is required');
    } else {
      setAgeError('');
    }

    if (phoneNumber === '') {
      isValid = false;
      setPhoneNumberError('This field is required');
    } else if (phoneNumber.length !== 10) {
      isValid = false;
      setPhoneNumberError('Phone number must be 10 digits');
    } else {
      setPhoneNumberError('');
    }

    if (role === '') {
      isValid = false;
      setRoleError('Select your role');
    } else {
      setRoleError('');
    }

    if (isValid) {

      var age1 = parseInt(age, 10)
      var phNo = parseInt(phoneNumber, 10)
      const formData = {
        userid: email,
        pwd: password,
        age: age1,
        ph_no: phNo,
        gender: gender,
        residence: residence,
        name: name,
      }
      console.log(formData)
      // Your registration logic here, e.g., using Firebase or an API call.
      try {
        await axios.post('http://localhost:8800/api/user/register', formData)
        console.log("Registration successfull")
        navigate('/login')
      } catch (error) {
        setErr(error.response.data)
        console.log("Registration failed")
        console.log(error)
      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-amber-400 via-amber-300 to-amber-100">
  <div className="bg-white p-8 rounded-md shadow-lg w-96">
    <h2 className="text-4xl font-extrabold text-center text-black mb-6 font-serif">
      BeeQuick Register
    </h2>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="role">
          Role:
        </label>
        <select
          name="role"
          id="role"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Driver">Partner</option>
          <option value="Customer">Customer</option>
        </select>
        {roleError && <p className="text-red-500 text-sm">{roleError}</p>}
      </div>

      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
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

      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="password">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id="password"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="absolute top-3 right-3 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300" 
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className="absolute top-3 right-3 text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}
      </div>

      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="gender">
          Gender:
        </label>
        <select
          name='gender'
          id="gender"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {genderError && <p className="text-red-500 text-sm">{genderError}</p>}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="residence">
          Residence:
        </label>
        <input
          type="text"
          name='residence'
          id="residence"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          placeholder="Your residence"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
          required
        />
        {residenceError && <p className="text-red-500 text-sm">{residenceError}</p>}
      </div>

      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="age">
          Age:
        </label>
        <input
          type="number"
          name='age'
          id="age"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          placeholder="Your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        {ageError && <p className="text-red-500 text-sm">{ageError}</p>}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black text-sm font-semibold mb-2" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          type="tel"
          name='phoneNumber'
          id="phoneNumber"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-300"
          placeholder="Your phone number"
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          required
        />
        {phoneNumberError && (
          <p className="text-red-500 text-sm">{phoneNumberError}</p>
        )}
      </div>
    </div>

    <div className="flex items-center justify-between mb-4">
      <Link to="/Subscription" className="w-full">
        <button
          onClick={handleRegister}
          className="w-full bg-black text-yellow-300 font-semibold py-3 rounded-md hover:bg-gray-900 focus:ring focus:ring-yellow-400"
        >
          Register
        </button>
      </Link>
    </div>

    <div className="text-center text-black">
      Already have an account?{" "}
      <Link to="/Login" className="text-yellow-300 hover:underline">
        Login
      </Link>
    </div>
  </div>
</div>


  );
}

export default Register;