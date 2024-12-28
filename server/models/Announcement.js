const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {type: mongoose.Schema.Types.ObjectId,ref: 'FileUpload', required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Duyuru yapan
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);