import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  residence: { type: String, required: true },
  age: { type: Number, required: true },
  ph_no: { type: String, required: true },
  pwd: { type: String, required: true },
  role: { type: String, default: 'User' },
});

const User = mongoose.model('User', UserSchema);

export default User;
