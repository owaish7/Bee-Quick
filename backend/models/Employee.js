import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    emp_id: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    name: { type: String, required: true },
    ph_no: { type: String, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true },
    age: { type: Number, required: true },
    residence: { type: String, required: true },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
