import express from 'express';
import router from '../userRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = 8000;


const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://127.0.0.1:5173", 
    secure: true,
    credentials: true,
}));


app.use(express.json())


app.use('/',router);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export default app;