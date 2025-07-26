// connectToMongoDB.js
import mongoose from "mongoose";

const connectToMongoDB = () => {
  return mongoose.connect(process.env.MONGO_DB_URI); // No need for options
};

export default connectToMongoDB;
