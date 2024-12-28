const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Forum gönderisinin başlığı
  content: { type: String, required: true }, // Forum gönderisinin içeriği
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Gönderi yazarı
  comments: [{ // Yorumlar
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Yorumu yazan kullanıcı
    content: { type: String, required: true }, // Yorum içeriği
    createdAt: { type: Date, default: Date.now } // Yorumun oluşturulma tarihi
  }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Gönderiyi beğenen kullanıcılar
  disslikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  tags: [{ type: String }], // Forum gönderisine ait etiketler
  createdAt: { type: Date, default: Date.now } // Gönderinin oluşturulma tarihi
});

module.exports = mongoose.model('Forum', forumSchema);