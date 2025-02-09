import express from 'express'
import cors from 'cors'

const app = express()

// Define the allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:3000",
    "https://practice-project-bice.vercel.app",
    "https://mycampussafari.com"
];

// CORS Middleware for Express
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                // If the origin isn't in the allowed list
                return callback(new Error("Not allowed by CORS"), false);
            }
            return callback(null, true);
        },
        credentials: true, // Enable credentials (cookies, etc.)
    })
);


app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

import userRoutes from './routes/user.routes.js'
app.use('/api/v1', userRoutes)

export { app }