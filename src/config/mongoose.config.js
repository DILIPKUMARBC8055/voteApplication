// Importing the dotenv module to load environment variables from a .env file
import dotenv from 'dotenv';
// Configuring dotenv to load environment variables
dotenv.config();

// Importing the mongoose module for MongoDB interaction
import mongoose from "mongoose";
// Importing the custom error handler
import ApplicationError from "../errorHandling/custom.Error.js";

// Defining an asynchronous function to connect to MongoDB
const connectToMongodb = async () => {
  try {
    // Connecting to MongoDB using the DB_URL environment variable
    await mongoose.connect(process.env.DB_URL);
    // Logging a success message if connection is successful
    console.log("Connected to MongoDB");
  } catch (err) {
    // Throwing an ApplicationError if connection fails
    throw new ApplicationError(err, 500);
  }
};

// Exporting the connectToMongodb function
export default connectToMongodb;
