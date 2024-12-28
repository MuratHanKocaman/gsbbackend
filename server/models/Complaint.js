const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    contentId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Şikayet edilen içerik ID'si
    contentType: { type: String, enum: ['event', 'announcement', 'forumPost'], required: true }, // İçerik türü
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Şikayet eden kullanıcı
    note: { type: String, required: true }, // Kullanıcının şikayet notu
    status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' }, // Şikayet durumu
    createdAt: { type: Date, default: Date.now }, // Şikayet tarihi
});

module.exports = mongoose.model('Complaint', complaintSchema);