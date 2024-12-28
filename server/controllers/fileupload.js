const FileUpload = require('../models/FileUpload');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../files'); // files klasörü
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Klasör yoksa oluştur
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Dosya yükleme
const uploadFile = async (req, res) => {
    try {
        const { file } = req;
        const userId = req.user.id;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFileUpload = new FileUpload({
            user: userId,
            filePath: file.path,
            fileType: file.mimetype,
        });

        const savedFile = await newFileUpload.save();
        res.status(201).json(savedFile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yüklenen tüm dosyaları listele
const getAllFiles = async (req, res) => {
    try {
        const files = await FileUpload.find().populate('user', 'name email');
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Belirli bir kullanıcının dosyalarını listele
const getUserFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const files = await FileUpload.find({ user: userId });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Belirli bir dosyayı sil
const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await FileUpload.findByIdAndDelete(id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Fiziksel dosyayı da sil
        fs.unlink(file.filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dosyayı ID ile getir ve döndür
const getFileById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await FileUpload.findById(id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Dosya yolunu belirle
        const filePath = path.resolve(file.filePath);

        // Dosyayı döndür
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ message: 'Error sending file' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    uploadFile,
    getAllFiles,
    getUserFiles,
    deleteFile,
    getFileById, // Yeni metod
};

