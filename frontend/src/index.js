import '../styles/main.css';
import { initSocket } from './socket.js'; // Импортируем

console.log('Rspack app started!');

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Привет! Rspack работает 🚀</h1><p>Открой консоль (F12) -> Console, чтобы увидеть чат.</p>';
    
    initSocket(); // Запускаем тест соединения
});