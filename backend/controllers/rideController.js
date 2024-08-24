import Ride from '../models/Ride.js';  // Use default import
import Location from '../models/Location.js';  // Use default import
import Bike from '../models/Bike.js';  // Use default import
import User from '../models/User.js';  // Use default import if User uses default export

// Example usage of the models

// Check available drivers (bikes) at a given location
export const checkDrivers = async (req, res) => {
    try {
        const { loc_pick } = req.query;  // Assuming the pickup location is passed as a query parameter

        console.log(loc_pick);


        // Fetch the location ID of the pickup location
        const location = await Location.findOne({ name: loc_pick });  // Changed 'loc_name' to 'name'
        if (!location) {
            return res.status(400).json({ message: "Invalid pickup location" });
        }
        // console.log(location);
        // console.log(loc_pick)

        // Find available bikes at the specified location
        const availableBikes = await Bike.find({ avail: true, avail_loc: location.name })  // Changed 'avail_loc' to use location ID
            .populate('owner_id', 'name gender');  // Populate owner details (optional)

        if (!availableBikes.length) {
            return res.status(404).json({ message: "No bikes available at the selected location" });
        }

        return res.status(200).json(availableBikes);
    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

// Create a new ride
export const createRide = async (req, res) => {
    try {
        const { user_id, loc_pick, loc_drop, bike_id } = req.body;

        if (!user_id || !loc_pick || !loc_drop || !bike_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await User.findOne({userid: user_id});


        // Fetch location IDs
        const initialLocation = await Location.findOne({ name: loc_pick });
        const finalLocation = await Location.findOne({ name: loc_drop });

        if (!initialLocation) {
            return res.status(400).json({ message: `Location not found: ${loc_pick}` });
        }
        if (!finalLocation) {
            return res.status(400).json({ message: `Location not found: ${loc_drop}` });
        }

        // Calculate amount
        const amount = 100;
        
        // Ensure amount is a valid number
        if (isNaN(amount)) {
            return res.status(400).json({ message: 'Invalid amount calculation' });
        }

        // Fetch bike by bike_id
        const bike = await Bike.findOne({ bike_id });
        if (!bike) {
            return res.status(400).json({ message: `Bike not found for bike_id: ${bike_id}` });
        }

        console.log(user)

        // Create a new ride
        const ride = new Ride({
            user_id: user._id, 
            bike_id: bike._id,
            loc_pick: initialLocation._id,
            loc_drop: finalLocation._id,
            amount: amount
        });

        console.log(ride)


        await ride.save();

        // Update bike availability
        bike.avail = false; // Assuming avail is a boolean field
        await bike.save();

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error in createRide:", err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};



// Get ride details for a user
export const getDetails = async (req, res) => {
    try {
        const { userid } = req.query;
        const rides = await Ride.find({ user_id: userid });
        return res.status(200).json(rides);
    } catch (err) {
        console.error("Error in backend:", err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Get driver details
export const getDriverDetails = async (req, res) => {
    try {
        const { emp_id } = req.query;
        const bikeIds = await Bike.find({ owner_id: emp_id }).distinct('_id');

        const rides = await Ride.find({
            time_drop: null,
            bike_id: { $in: bikeIds }
        })
        .populate('user_id', 'name')
        .populate('loc_pick', 'name pincode street city state country')  // Changed 'loc_name' to 'name'
        .populate('loc_drop', 'name pincode street city state country');  // Changed 'loc_name' to 'name'

        return res.status(200).json(rides);
    } catch (err) {
        console.error("Error in backend:", err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Update drop time for a ride
export const updateDropTime = async (req, res) => {
    try {
        const { bike_id } = req.body;
        const date = new Date();

        const result = await Ride.updateOne({ bike_id }, { time_drop: date });
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error in backend:", err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Cancel a ride
export const cancelRide = async (req, res) => {
    try {
        const { bike_id } = req.body;
        const date = new Date();

        // Update bike availability
        await Bike.updateOne({ _id: bike_id }, { avail: true });  // Use boolean value

        // Update drop time for the ride
        const result = await Ride.updateOne({ bike_id }, { time_drop: date });
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error in backend:", err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
