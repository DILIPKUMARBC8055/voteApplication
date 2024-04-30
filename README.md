Voting Application


POSTMAN API LINK: https://app.getpostman.com/run-collection/16175746-e50761a3-b80f-4523-ac2e-05bb9b352b74?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D16175746-e50761a3-b80f-4523-ac2e-05bb9b352b74%26entityType%3Dcollection%26workspaceId%3D693199e8-ec1c-4cff-8914-1de9e8425d0a


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

user localhost:PORT/home for API fork

Folder Structure

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
