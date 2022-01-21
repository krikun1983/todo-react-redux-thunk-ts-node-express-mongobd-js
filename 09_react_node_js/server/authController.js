import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './models/User.js';
import Role from './models/Role.js';
import Category from './models/Category.js';
import fs from 'fs';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, config.get('secret'), { expiresIn: "2h" })
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors })
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "ADMIN" });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Registration error!' });
    }
  }

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

  async getUsers(req, res) {
    const users = await User.find();
    return res.json(users);
  }

  async createCategory(req, res) {
    try {
      const { category, parentId, children } = req.body;
      const categoryNew = await Category.create({ category, parentId, children });
      res.status(200).json(categoryNew);
    } catch (error) {
      res.status(500).json(error);
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


  async getCategoryOne(req, res) {
  }
}

export default new AuthController();