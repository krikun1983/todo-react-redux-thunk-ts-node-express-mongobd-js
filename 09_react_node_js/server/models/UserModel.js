import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  roles: [{ type: String, ref: 'RoleModel' }],
});

export default mongoose.model('UserModel', UserSchema);