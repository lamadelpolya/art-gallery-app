const multer = require("multer");

const storage = multer.memoryStorage(); // Store the file in memory temporarily
const upload = multer({ storage }); // This is what handles the file upload

module.exports = upload;
