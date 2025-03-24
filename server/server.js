import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/UserRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import tripRouter from "./routes/TripRoutes.js";
import cors from 'cors';

dotenv.config();
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/trip',tripRouter);
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.error("DB Connection failed:", error);
});

app.listen(PORT , () => {
    console.log(`Server is live at PORT ${PORT}`);
});