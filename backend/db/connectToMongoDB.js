// connectToMongoDB.js
import mongoose from "mongoose";

// const connectToMongoDB = () => {
//   console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);

//   return mongoose.connect(process.env.MONGO_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

const connectToMongoDB = () => {
  return mongoose.connect(process.env.MONGO_DB_URI); // No need for options
};

export default connectToMongoDB;
