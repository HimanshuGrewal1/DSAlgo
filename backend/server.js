import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/DB/connectMongoDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./src/routes/auth.route.js";
import GetQues from "./src/routes/GetQues.route.js"
import { createServer } from "http";
import { Server } from "socket.io";
import SeedDB from "./src/DB/seed.js";
import UserRoute from "./src/routes/GetUser.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use("/api/auth", authRoutes);
app.use("/api/GETQUES",GetQues)
app.use("/api/user",UserRoute );


const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// io.on("connection", (socket) => {
//   console.log(" New client connected:", socket.id);

//   socket.on("message", (data) => {
//     console.log(" Message received:", data);
//     io.emit("message", data); 
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });


connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    //   SeedDB();
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });
