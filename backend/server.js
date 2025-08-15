import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/DB/connectMongoDB.js";


const app = express();
dotenv.config()


const port=process.env.PORT || 8000


app.get("/",(req,res)=>{
    res.send("Server is ready")
})





app.listen(port,()=>{
    console.log(`Server is runing at port ${port}`)
    connectDB()
})