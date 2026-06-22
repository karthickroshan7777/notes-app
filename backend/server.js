console.log("===== SERVER STARTED =====");
const express=require("express");
const cors=require("cors");
require("dotenv").config();
const connectDB=require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const app=express();
//mongo
console.log("Before connectDB()");
connectDB();
console.log("After Connected");
//middleware
app.use(cors());//allows app to use cors for incoming req
app.use(express.json());//allows app to use json
//route
app.use("/notes", noteRoutes);
app.get("/", (req,res)=>{
    res.send("Notes app is running");
}
);
const PORT =process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});