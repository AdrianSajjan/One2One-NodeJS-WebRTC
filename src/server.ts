import cors from "cors";
import http from "http";
import morgan from "morgan";
import express from "express";
import socketio from "socket.io";
import upload from "./lib/upload";

import type { SocketAnswerData, SocketIceCandidateData, SocketOfferData } from "./interface/socket";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new socketio.Server(server, { cors: { origin: "*" } });

let rooms = {};

let mapSocketToRooms = {};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  socket.on("join-room", (roomID: string) => {
    console.log("Joined Room: ", roomID);
    if (rooms[roomID]) rooms[roomID].push(socket.id);
    else rooms[roomID] = [socket.id];
    const user = rooms[roomID].find((id: string) => id !== socket.id);
    console.log(rooms);
    console.log(user);
    if (user) {
      socket.emit("user-joined", user);
      socket.to(user).emit("partner-data", socket.id);
    }
  });

  socket.on("ice-candidate", (data: SocketIceCandidateData) => {
    io.to(data.to).emit("ice-candidate", data);
  });

  socket.on("offer", (data: SocketOfferData) => {
    console.log("Offer");
    io.to(data.to).emit("offer", data);
  });

  socket.on("answer", (data: SocketAnswerData) => {
    console.log("Answer");
    io.to(data.to).emit("answer", data);
  });
});

app.post("/save-chunks", upload.single("buffer"), async (req, res) => res.send({ ...req.file }));

server.listen(5000, () => console.log("Server is running on PORT 5000"));
