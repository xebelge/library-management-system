Library Management API

This project provides a RESTful API for a library management system. The API is built using Express.js and uses SQLite as the database.

Features
- List books
- Get book details
- Borrow and return books
- List users and get user details
- List books borrowed by users

Requirements
To run this project, you will need the following:

- Node.js
- SQLite

Installation

1. Clone the repository:
   git clone <repository-url>

2. Install the necessary dependencies:
   yarn install

3. Create the SQLite database:
   When you start the project, the library.db file will be automatically created in the db folder.

4. Start the server:
   yarn start

   The server will run by default at http://localhost:3001.

API Endpoints

1. Books
- List all books:
  GET /books

- Get book details:
  GET /books/:bookId

- Borrow a book:
  POST /books/:bookId/borrow
  Body: { userId: <userId> }

- Return a book:
  POST /books/:bookId/return

2. Users
- List all users:
  GET /users

- Get user details:
  GET /users/:userId

3. Borrowed Books
- List books borrowed by a user:
  GET /users/:userId/borrowed-books

Database
I use SQLite as the database. The database file will be created at db/library.db. The tables will be automatically created when the application starts.

Environment Variables
The following environment variables can be set for the project:

- PORT: The port on which the server will run. The default is 3001.

Development
To develop the project, you can use the following commands:

- Start the server in development mode:
  yarn dev

  This command will watch for changes in the code and automatically restart the server.
