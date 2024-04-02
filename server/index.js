import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";

dotenv.config(); 
const app = express();

app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}));
app.use(express.json());
app.use("/auth", UserRouter);
app.use(cookieParser())

mongoose.connect(process.env.MONGOURI).then(()=>{
  console.log(`Mongoose connected.`);
}).catch((err)=>{
  console.log(err);
})

app.listen(process.env.PORT, () => {
  console.log(`Port is running at ${process.env.PORT}`);
});
