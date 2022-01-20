import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  roles: [{ type: String, ref: 'Role' }]
});

export default mongoose.model('User', User);