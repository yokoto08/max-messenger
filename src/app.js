import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; // <--- 1. Импорт

const app = express();

app.use(cors()); 
app.use(express.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/api/chats', chatRoutes); // <--- 2. Подключение маршрута

app.get('/api/test', (req, res) => {
  res.json({ message: 'Бэкенд работает успешно!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так на сервере', details: err.message });
});

// ...
app.use(express.json());
// Открываем доступ к папке с картинками
app.use('/uploads', express.static('uploads'));
// ...

export default app;