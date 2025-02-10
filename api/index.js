import express from 'express';
import router from '../userRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = 8000;


const app = express();

app.use(cookieParser());

const allowedOrigins = ["https://feistybitfrontend2.vercel.app", 
    "http://127.0.0.1:5173"
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    
    credentials: true,
}));


app.use(express.json())


app.use('/',router);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export default app;