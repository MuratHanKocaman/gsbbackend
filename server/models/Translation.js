const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    lang: { type: String, required: true }, // Dil kodu (ör. 'en', 'tr')
    key: { type: String, required: true }, // Çeviri anahtarı (ör. 'welcome')
    value: { type: String, required: true }, // Çeviri metni (ör. 'Hoş geldiniz')
});

module.exports = mongoose.model('Translation', TranslationSchema);