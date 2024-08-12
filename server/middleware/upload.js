const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile-pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
