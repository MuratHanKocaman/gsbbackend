const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Etkinlik düzenleyeni
  date: { type: Date, required: true },
  location: { type: String, required: true },
  badge: {type: mongoose.Schema.Types.ObjectId, ref: 'Badge'},
  qrCode: { type: String }, // QR kod bağlantısı
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Katılımcılar
  url: {type: String},
  image: {type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload'},
  approved: { type: Boolean, default: false }, // Onay durumu
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);