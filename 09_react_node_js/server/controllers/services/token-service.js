import jwt from 'jsonwebtoken';
import { TokenModel } from '../../models/index.js';
import config from 'config';
const { access_secret, tokens } = config.get('jwtConfig');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, access_secret, { expiresIn: tokens.access.expiresIn });
    return {
      accessToken,
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, access_secret);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, accessToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.accessToken = accessToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, accessToken });
    return token;
  }

  async removeToken(accessToken) {
    const tokenData = await TokenModel.deleteOne({ accessToken });
    return tokenData;
  }

  async findToken(accessToken) {
    const tokenData = await TokenModel.findOne({ accessToken });
    return tokenData;
  }
}

export default new TokenService();