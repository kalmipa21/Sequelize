import express from "express";
import cors from "cors";
import user_router from "./src/routers/users.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//routers
app.use("/api/v1", user_router);

//image public
app.use("/api/v1/public", express.static("./public"));

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
