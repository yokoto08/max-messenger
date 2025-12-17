import multer from 'multer';
import path from 'path';

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка куда сохранять
  },
  filename: (req, file, cb) => {
    // Делаем уникальное имя файла: дата + случайное число + расширение
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Фильтр (опционально, можно разрешить всё)
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });