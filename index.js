// Importing and configuring dotenv to load environment variables from a .env file
import dotevn from "dotenv";
dotevn.config();

// Importing required modules
import express from "express"; // Express.js framework for building web applications
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import router from "./src/route/application.route.js"; // Importing router for application routes
import connectToMongodb from "./src/config/mongoose.config.js"; // Function to connect to MongoDB
import ApplicationError from "./src/errorHandling/custom.Error.js"; // Custom error handler
import path from "path";

// Creating an instance of the Express server
const server = express();

// Using bodyParser middleware to parse URL-encoded request bodies
server.use(bodyParser.urlencoded({ extended: true }));

// Using express.json() middleware to parse JSON request bodies
server.use(express.json());

// Using the router for application routes
server.use("/", router);

server.get("/home", (req, res) => {
  res.sendFile(path.join(path.resolve(), "hompage.html"));
});
// Error handling middleware to catch any unhandled errors
server.use((err, req, res, next) => {
  if (err) {
    if (err instanceof ApplicationError) {
      // If the error is an instance of ApplicationError
      return res.status(err.code).send(err.message); // Send error message with appropriate status code
    }
    return res.status(500).send(err.message); // Otherwise, send generic error message with status code 500
  }
  next(); // Continue to the next middleware
});

// Starting the server and listening on the specified port from environment variables
server.listen(process.env.PORT, () => {
  console.log("server is listening at port:" + process.env.PORT);
  // Connecting to MongoDB database
  connectToMongodb();
});
