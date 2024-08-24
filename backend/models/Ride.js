import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bike_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    loc_pick: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    loc_drop: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    // time_pick: { type: Date, default: Date.now },
    // time_drop: { type: Date },
    amount: { type: Number, required: true }
});

export const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
