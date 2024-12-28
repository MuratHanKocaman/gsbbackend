const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // express-validator'dan içe aktarma

const verifyToken = (req, res, next) => {
  // Token'ı cookie veya Authorization başlığından al
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Sonraki middleware ya da route handler'a geç
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Admin yetkisi kontrolü için middleware
const isAdmin = (req, res, next) => {
  const allowedRoles = ['community', 'company', 'organization']; // Modeldeki userType seçenekleri

  if (req.user && allowedRoles.includes(req.user.userType)) {
    next(); // Eğer yetkili bir role sahipse, devam et
  } else {
    res.status(403).json({ message: 'Access denied. Only specific roles allowed.' });
  }
};

// Kullanıcı kayıt doğrulama için middleware
const validateUserRegistration = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Fonksiyonları dışa aktar
module.exports = { verifyToken, isAdmin, validateUserRegistration };