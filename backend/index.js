import express, { urlencoded } from 'express';
import { connectDB } from './db.js'; // Import the connectDB function from db.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import driverRoutes from './routes/driverRoute.js';
import rideRoutes from './routes/rideRoute.js';

const app = express();

// MIDDLEWARES
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,  // To allow cookies across different domains
    })
);
app.use(express.json());

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/ride', rideRoutes);

app.get("/", (req, res) => {
    res.json("Hello there!");
});

// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(8800, () => {
        console.log("Connected to MongoDB and server is running on port 8800!");
    });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
