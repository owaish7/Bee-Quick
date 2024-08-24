import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';  // Assuming the path to User model is correct

// REGISTER FUNCTION
export const register = async (req, res) => {
    const { userid, name, gender, residence, age, ph_no, pwd } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ userid });
        if (existingUser) {
            return res.status(409).json("User already exists!");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(pwd, salt);

        // Create a new user document
        const newUser = new User({
            userid,
            name,
            gender,
            residence,
            age,
            ph_no,
            pwd: hashedPassword,
            role: "User"
        });

        // Save the new user to the database
        await newUser.save();
        return res.status(200).json("User has been created");

    } catch (err) {
        console.error("Error occurred during registration", err);
        return res.status(500).json(err);
    }
};

// LOGIN FUNCTION
// LOGIN FUNCTION
export const login = async (req, res) => {
    const { userid, pwd } = req.body;  // Destructure userid and pwd from req.body
  
    try {
        // Check if the user exists
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json("User not found!");
        }
  
        // Check if the password matches
        const checkPassword = bcrypt.compareSync(pwd, user.pwd);
        if (!checkPassword) {
            return res.status(400).json("Wrong password or username");
        }
  
        // Create a JWT token
        const token = jwt.sign({ userid: user.userid }, "secretkey");
  
        // Exclude the password from the response by renaming the destructured pwd variable to something else
        const { pwd: hashedPwd, ...other } = user._doc;
  
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(other);
  
    } catch (err) {
        console.error("Error occurred during login", err);
        return res.status(500).json(err);
    }
  };
  

// LOGOUT FUNCTION
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");
};
