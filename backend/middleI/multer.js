const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Required to check and create directory

// Set the upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure that the uploads folder exists or create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true ensures parent directories are created if needed
}

// Set the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Specify the folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // Filename will be unique (timestamp + original extension)
    );
  },
});

// Filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Configure Multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = upload;
