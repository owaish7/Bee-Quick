import mongoose from 'mongoose';

const BikeSchema = new mongoose.Schema({
    bike_id: { type: String, required: true, unique: true },
    owner_id: { type: String, required: true },
    manufacturing_date: { type: Date, required: true },
    model: { type: String, required: true },
    avail: { type: Boolean, required: true },
    avail_loc: { type: String, required: true } 
});

const Bike = mongoose.model('Bike', BikeSchema);

export default Bike;
