import { createChat, getAllChats, getChatMessages } from '../models/chatModel.js';
import { createMessage } from '../models/messageModel.js';

export const createNewChat = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Имя чата обязательно' });
    
    // req.user берется из токена (authMiddleware)
    const chat = await createChat(name, req.user.id); 
    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await getAllChats();
    res.json(chats);
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const messages = await getChatMessages(req.params.id);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const file = req.file; // Если есть файл, он будет здесь

    if (!content && !file) {
      return res.status(400).json({ error: 'Сообщение не может быть пустым' });
    }

    // Определяем тип сообщения
    let type = 'text';
    let fileUrl = null;

    if (file) {
      type = file.mimetype.startsWith('image/') ? 'image' : 'file';
      // Ссылка, по которой фронт сможет скачать файл
      fileUrl = `/uploads/${file.filename}`;
    }

    // 1. Сохраняем в БД
    const newMessage = await createMessage(chatId, req.user.id, content || '', type, fileUrl);

    // 2. ОТПРАВЛЯЕМ ВСЕМ ЧЕРЕЗ WEBSOCKET (REAL-TIME)
    const wss = req.app.get('wss');
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // 1 = OPEN
        client.send(JSON.stringify({
          type: 'NEW_MESSAGE',
          payload: newMessage
        }));
      }
    });

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
};