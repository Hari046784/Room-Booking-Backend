import express from 'express';
import cors from 'cors';
import connect from './db/connect.js';
import dotenv from 'dotenv';

// Importing the routes
import homeRoutes from './routes/home.routes.js';
import ownerRoutes from './routes/ownerAuth.routes.js';
import guestRoutes from './routes/userAuth.routes.js';
import roomRoutes from './routes/room.routes.js';
import cookieParser from 'cookie-parser';

//Initializing the express
const app = express();

// Calling the express.json() method for parsing and call cors
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);


// dotenv environment setup
dotenv.config();



//Adding the custom middleware
app.use('/api/home', homeRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/ownerAuth', ownerRoutes);
app.use('/api/guestAuth', guestRoutes);

//Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something Error!!!';
    return res.status(status).json({
      success: false,
      status,
      message,
      stack: err.stack,
    });
});

//Testing
app.get("/", (req, res)=>{
    res.status(200).send("Welcome to our Room Booking Application");
})

//Initializing the port number
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Application is running on PORT ${PORT}`);
    connect();
});