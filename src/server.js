import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDB } from './config/db.js';

// Инициализация приложения
const app = express();
const server = http.createServer(app);

// WebSocket на пути /chat-ws
const wss = new WebSocketServer({ server, path: '/chat-ws' }); 

// Конфигурация
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

// Инициализация Базы Данных
initDB(); // <--- ЗАПУСК ЗДЕСЬ

// Тестовый маршрут
app.get('/api/test', (req, res) => {
  res.json({ message: 'Бэкенд работает успешно!' });
});

// Логика WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  
  ws.on('message', (message) => {
    // Парсим сообщение, чтобы убедиться, что это JSON
    try {
        const parsed = JSON.parse(message);
        console.log('Received:', parsed);
        // Эхо ответ
        ws.send(JSON.stringify({ type: 'info', text: 'Сервер получил твое сообщение!' }));
    } catch (e) {
        console.log('Received raw:', message.toString());
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
  ws.on('error', console.error);
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`🔌 WebSocket ждет подключений по адресу /chat-ws`);
});