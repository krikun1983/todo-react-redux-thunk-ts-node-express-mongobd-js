import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
  accessToken: { type: String, required: true },
});

export default mongoose.model('TokenModel', TokenSchema);