import express from "express";
import {
  createUser,
  detailUser,
  deleteUser,
  updateUser,
  allUsers,
} from "../controllers/users.js";
import multer from "multer";
import path from "path";

const Router = express.Router();

// const upload = multer({ dest: "./public/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `user_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

Router.post("/users", upload.single("image"), createUser)
  .get("/users", allUsers)
  .get("/users/:id", detailUser)
  .patch("/users/:email", updateUser)
  .delete("/users/:id", deleteUser);

export default Router;
