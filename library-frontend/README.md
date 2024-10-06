
Library Management System

This project is a library management system developed using React and Express. It provides core functionality for users to view, borrow, and return books. Data is made persistent using an SQLite database.

Features

- User Management: Users can be created, and user details can be viewed.
- Book Management: Books can be added, viewed, and their details can be inspected.
- Borrowing/Returning: Users can borrow and return books.
- Database: Data is persisted using SQLite.

Installation

Required Software

- Node.js
- Yarn
- SQLite

Steps

1. Download and extract the project files.
2. Navigate to the project directory in your terminal and install the dependencies:

   yarn install

3. Create the SQLite database. The database will be stored in the ./database.sqlite file.
4. Start the application:

   yarn start

   This command will start the Express server and begin listening for API requests.

5. The application will run at http://localhost:3000 by default but you need to choose another port because server side already using this port.

API Endpoints

Users

- GET /users: Retrieves all users.
- POST /users: Creates a new user.
- GET /users/:id: Retrieves a specific user.
- GET /users/:userId/books: Lists the books borrowed by the user.
- POST /users/:userId/borrow/:bookId: User borrows a book.
- POST /users/:userId/return/:bookId: User returns a book.

Books

- GET /books: Retrieves all books.
- POST /books: Adds a new book.
- GET /books/:id: Retrieves a specific book.

Database Structure

- User: Stores user information (ID, name).
- Book: Stores book information (ID, name, score, borrowed by user).
- Loan: Stores borrowing and returning transactions (user ID, book ID, borrowing date, return date).
