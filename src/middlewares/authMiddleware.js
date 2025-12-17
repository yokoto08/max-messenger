import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Сохраняем данные юзера в запрос
      next();
    } catch (err) {
      res.status(401).json({ error: 'Неверный токен' });
    }
  } else {
    res.status(401).json({ error: 'Нет авторизации' });
  }
};