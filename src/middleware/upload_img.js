import multer from "multer";
import path from "path";
import messages from "../utils/messages.js";

const max_size_file = 1; // 1MB

//set destionation storage and filename
const multerStorage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./public/");
  },
  filename: (req, res, callback) => {
    let file_name = `user_${Date.now()}${path.extname(file.originalname)}`;
    callback(null, file_name);
  },
});

//set connection multer with storage
const uploading = multer({
  storage: multerStorage,
  limits: { fileSize: max_size_file * 1024 * 1024 },
  //validation extention name
  fileFilter: (req, res, callback) => {
    const type = path.extname(file.originalname).toLowerCase();
    if ([".png", ".jpg", ".jpeg"].includes(type)) callback(null, true);
    else
      callback({
        error: "Extention image must be jpg/jpeg/png",
        code: "wrongtype",
      });
  },
});
