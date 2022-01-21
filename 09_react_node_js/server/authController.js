import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './models/User.js';
import fs from 'fs';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, config.get('secret'), { expiresIn: "2h" })
}

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, username })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Login error' })
    }
  }

  async getCategoryAll(req, res) {
    try {
      fs.readFile('./data_default/data_categories.json', 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          const databases = JSON.parse(data);
          return res.json(databases);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getTasksAll(req, res) {
    try {
      fs.readFile('./data_default/data_tasks.json', 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          const databases = JSON.parse(data);
          return res.json(databases);
        }
      })
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

export default new AuthController();