import mongoose from "mongoose";

const connectDB = async () => {
  const connectionUrl = process.env.DB_URI;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("MongoDB Connection Successful"))
    .catch((error) => console.log("MongoDB Connection Failed", error));
};

export default connectDB;