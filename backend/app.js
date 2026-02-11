import express from 'express';
import http from 'http';
import config from './src/config/config.js';


const app = express();
const httpServer = http.createServer(app);

// middlewares


// rateLimting 


// routes 
import authRoutes from './src/modules/auth/auth.route.js';


app.use("/api/v1/auth" , authRoutes);


// simple route for checking server status 
app.get("/" , (req , res) => {
    res.status(200).json({
        status:"sucess",
        message:"Welcome to template-repo",
        environment:config.NODE_ENV,
    })
})


// 404 route handler for undefined routes
app.all("*name"  , (req , res , next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404 ;
    err.status = "fail",
    next(err);
})

// error middlewares 

export default httpServer;
