const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: mongoose.Schema.Types.ObjectId,ref: 'FileUpload' }, // Rozet ikonu
  point: { type: Number, required: true }, //puan
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);