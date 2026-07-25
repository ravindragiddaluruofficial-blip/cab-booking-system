const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;

  const extname = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowed.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb("Only Images Allowed");
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;