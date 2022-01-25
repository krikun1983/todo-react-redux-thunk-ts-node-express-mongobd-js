import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  value: { type: String, unique: true, default: 'ADMIN' }
});

export default mongoose.model('RoleModel', RoleSchema);