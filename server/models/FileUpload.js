const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Dosya yükleyen
  filePath: { type: String, required: true }, // Dosya yolu
  fileType: { type: String, required: true }, // Dosya türü (ör: image/png)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FileUpload', fileUploadSchema);