const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Inside connectDB()");
    console.log("URI:", process.env.MONGO_URL);

    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection failed");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
