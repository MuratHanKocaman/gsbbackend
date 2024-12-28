const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['young', 'community', 'company', 'organization'], required: true },
  profileImage: {type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload'},
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }], // Kazanılan rozetler (Sadece bireysel kullanıcılar için)
  point: { type: Number},
  blogs: [{type : mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
  profileDetails: {
    type: mongoose.Schema.Types.Mixed, // Kurum veya bireysel kullanıcıya özel bilgiler
    default: {}
  },
  otp: { type: String },
  otpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
