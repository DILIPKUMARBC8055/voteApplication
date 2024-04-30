Voting Application

Description
This is a simple web application for conducting voting on various questions. Users can create questions, add options to questions, vote for options, and view the results.

Technologies Used

Node.js
Express.js
MongoDB
Mongoose
Other dependencies (body-parser, dotenv)

Setup

Clone the Repository:

git clone https://github.com/DILIPKUMARBC8055/voteApplication.git

Install Dependencies:

npm install

Set Environment Variables:
Create a .env file in the project root directory and add the following environment variables:
makefile

PORT=3000
DB_URL=<mongodb_connection_string>

Start the Server:
npm start

API Endpoints

GET /questions/:id: View a question along with its options and vote count for each option.
POST /questions: Create a new question.
POST /questions/:id/options: Add a new option to a question.
POST /questions/:id/vote: Add a vote to an option.
DELETE /questions/:id: Delete a question.
DELETE /questions/:id/options: Delete an option.

Folder Structure

Copy code
├── src/
│ ├── controller/
│ │ └── vote.controller.js
│ ├── errorHandling/
│ │ └── custom.Error.js
│ ├── model/
│ │ ├── options.schema.js
│ │ ├── question.schema.js
│ │ └── vote.schema.js
│ ├── route/
│ │ └── application.route.js
│ └── config/
│ └── mongoose.config.js
├── .env
├── package.json
├── server.js
└── README.md
