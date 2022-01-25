import bcrypt from 'bcryptjs';
import ApiError from '../../exceptions/api-error.js';
import { RoleModel, UserModel } from '../../models/index.js';
import { tokenService } from './index.js';

const payload = (id, username, roles) => {
  return {
    id,
    username,
    roles,
  }
}

class AuthorizationService {
  async registration(username, password) {
    const candidate = await UserModel.findOne({ username });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`);
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await RoleModel.findOne({ value: "ADMIN" });

    const user = await UserModel.create({ username, password: hashPassword, roles: [userRole.value] });
    await user.save();

    const tokens = tokenService.generateTokens(payload(user._id, user.username, user.roles));
    await tokenService.saveToken(payload(user._id, user.username, user.roles).id, tokens.accessToken);

    return { ...tokens, user: payload(user._id, user.username, user.roles) };
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw ApiError.BadRequest(`User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw ApiError.BadRequest(`Password error`);
    }

    const tokens = tokenService.generateTokens(payload(user._id, user.username, user.roles));
    await tokenService.saveToken(payload(user._id, user.username, user.roles).id, tokens.accessToken);

    return { ...tokens, user: payload(user._id, user.username, user.roles) };
  }

  async logout(accessToken) {
    const token = await tokenService.removeToken(accessToken);
    return token;
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new AuthorizationService();