import jwt from 'jsonwebtoken';
import config from 'config';

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedTokenData = jwt.verify(token, config.get('secret'));
    req.user = decodedTokenData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
}

export default authMiddleware;