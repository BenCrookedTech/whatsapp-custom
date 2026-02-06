import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import router from "./routes/routes.js";
import dotenv from 'dotenv';
import { initWhatsApp } from './whatsapp-client.js';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api", router);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin: "*"},
});

io.on("connection", (socket) => {
    console.log("App connected successfully", socket.id);

    socket.emit("wa:status", {connection: "connected_to_backend"});
});

server.listen(port, "0.0.0.0", async() => {
    console.log(`Server running on port ${port}`);
    await initWhatsApp(io);
})