const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 300 * 1024 * 1024 },
});

module.exports = upload;
