import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js'; // Assuming correct path to Employee model
import Bike from '../models/Bike.js';         // Assuming correct path to Bike model

// REGISTER FUNCTION
export const register = async (req, res) => {
    const { emp_id, pwd, name, ph_no, gender, role, age, residence, bike_id, manufacturing_date, model, avail } = req.body;
    
    try {
        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ emp_id });
        if (existingEmployee) {
            return res.status(409).json("Employee already exists!");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(pwd, salt);

        // Create a new employee document
        const newEmployee = new Employee({
            emp_id,
            pwd: hashedPassword,
            name,
            ph_no,
            gender,
            role,
            age,
            residence,
        });

        // Save the new employee
        await newEmployee.save();

        // If the role is "Driver", add the bike details
        if (role === 'Driver') {
            const newBike = new Bike({
                bike_id,
                owner_id: emp_id,
                manufacturing_date: new Date(manufacturing_date),
                model,
                avail
            });

            // Save the new bike
            await newBike.save();
            return res.status(200).json("Driver has been created");
        } else {
            return res.status(200).json("Employee created");
        }

    } catch (err) {
        console.error("Error occurred during registration", err);
        return res.status(500).json(err);
    }
};

// LOGIN FUNCTION
export const login = async (req, res) => {
    const { emp_id, pwd } = req.body;

    try {
        // Find employee by emp_id
        const employee = await Employee.findOne({ emp_id });
        if (!employee) {
            return res.status(404).json("User not found!");
        }

        // Check if password matches
        const checkPassword = bcrypt.compareSync(pwd, employee.pwd);
        if (!checkPassword) {
            return res.status(400).json("Wrong password or username");
        }

        // Generate JWT token
        const token = jwt.sign({ emp_id: employee.emp_id }, "secretkey");

        // Send the response without the password
        const { pwd, ...other } = employee._doc;

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
