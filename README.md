# Pet Adoption App Backend

Welcome to the back-end repository for my pet adoption app built using the MERN stack.

Created as part of the Israel Tech Challenge Full Stack Development Program.

# Built With
[Node.js](https://nodejs.org/) - JavaScript runtime for building server-side applications.\
[Express](https://expressjs.com/) - Web framework for Node.js.\
[MongoDB](https://www.mongodb.com/) - NoSQL document-oriented database.\
[JWT](https://jwt.io/) - JSON Web Tokens for user authentication and authorization.\
[Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.

# Getting Started in Your Local Machine

## Clone the repository to your local machine

Use git clone 'remote repository URL'

## Install dependencies

Use npm install script

## Create a .env file in the root directory and add the following environment variables:

PORT = 8080
TOKEN_SECRET (create a new token secret)

#### Create your MongoDB Project to access your own connection URI 
DB_URL

#### Create your Cloudinary User to access your own variables variables:
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

## Start the development server

### `npm run devStart`

Runs the server in the development mode on [http://localhost:8080](http://localhost:8080).

# Endpoints

## Users' endpoints

POST /signup: Enables a user to signup.\
POST /login: Enables a user to login.\
GET /user/:id: Returns specific user's info based on the id.\
PUT /user/:id: Updates a user (protected to logged in user).\
GET /user: Returns a list with all the users (protected to admin users).\
GET /user/:id/full: Allows you to get a user based on the user's id, return all the user details (aside from password).

## Pets' endpoints

POST /pet: Adds a pet to the records (protected to admin users).\
GET /pet/:id: Returns the information of a specific pet from the database.\
POST /pet/:id/adopt: Changes the status of a pet to Adopted or Fostered, and adds the pet to the user's pets.\
POST /pet/:id/return: Changes the status of a pet to Available, and removes the pet from the user's pets.\
POST /pet/:id/save: Adds the pet to the user's saved pets.\
DELETE /pet/:id/save: Removes the pet from the user's saved pets.\
GET /pet: Returns a list with all the pets. Also used for search with query parameters.\
PUT /pet/:id: Updates a pet.\
GET /pet/user/:id: Allows a user to get the pets owned by (or saved) by a user based on the user id.
