import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import userRoute from './route/userRoute.js'

dotenv.config();

const app = express();
const httpsServer = createServer(app);
const io = new Server(httpsServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api', userRoute);

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURL;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    }
    catch (error){
        console.log('Failed to connect to MongoDB: ' + error.message);
    }
}

connectDB();

// Socket.IO connection handling
let messages = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('identify', ({ userName }) => {
        if (!userName) return;
        socket.join(`user:${userName}`);
        const history = messages.filter((message) => message.sender === userName || message.recipient === userName);
        socket.emit('mostRecentmessage', history);
    });

    // Handle new chat messages

    socket.on('directMessage', (messageData) => {
        if (!messageData?.sender || !messageData?.recipient || !messageData?.message_text) return;
        const message = { ...messageData, timestamp: messageData.timestamp || new Date().toISOString() };
        messages.push(message);
        io.to(`user:${message.sender}`).to(`user:${message.recipient}`).emit('newChatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
