
# Library Management System

This project is a full-stack library management system built using React for the frontend and Express.js for the backend. It provides functionality for managing books and users, borrowing and returning books, and tracking users' book loans. Data is persisted using an SQLite database.

## Features

- **User Management:** Create users, view user details, and list users.
- **Book Management:** Add new books, view details of each book, and list all books.
- **Borrowing/Returning:** Users can borrow and return books through the system.
- **Persistent Data:** All data is stored in an SQLite database.

## Project Structure

The project is divided into two parts:
1. **library-frontend:** The frontend of the library management system, built using React.
2. **library-management (backend):** The server-side application, built using Express.js, which provides RESTful APIs to handle library operations.

### Requirements

To run the full project, you will need the following:
- Node.js
- Yarn
- SQLite

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/xebelge/library-management-system.git
```

### 2. Install Dependencies for Backend:
Navigate to the `library-management` folder and install the necessary dependencies:
```bash
cd library-management
yarn install
```

### 3. Install Dependencies for Frontend:
Navigate to the `library-frontend` folder and install the necessary dependencies:
```bash
cd ../library-frontend
yarn install
```

### 4. Create the SQLite Database:
The SQLite database will be created automatically in the `db/` folder of the backend when the server starts for the first time.

### 5. Start the Backend Server:
Navigate to the `library-management` folder and start the server:
```bash
cd ../library-management
yarn start
```
The server will run by default at `http://localhost:3000`.

### 6. Start the Frontend:
Navigate to the `library-frontend` folder and start the React frontend:
```bash
cd ../library-frontend
yarn start
```
The frontend will run by default at `http://localhost:3001`.

> **Note:** Ensure that the backend server is running on a different port from the frontend. By default, the backend runs on port 3000 and the frontend runs on port 3001.

## API Endpoints

### Backend (Express.js)

1. **Books**
   - List all books: `GET /books`
   - Get book details: `GET /books/:bookId`
   - Borrow a book: `POST /books/:bookId/borrow` (Body: `{ userId: <userId> }`)
   - Return a book: `POST /books/:bookId/return`

2. **Users**
   - List all users: `GET /users`
   - Get user details: `GET /users/:userId`
   - List books borrowed by a user: `GET /users/:userId/borrowed-books`

### Frontend (React)

The frontend provides an interface for interacting with the library system, allowing users to:
- View the list of all books
- View book details
- Borrow and return books
- View user details and list the books borrowed by specific users

## Database

The project uses SQLite for data persistence. The database is located at `db/library.db` and will be created automatically when the backend server starts.

### Database Tables:
- **User:** Stores user information (ID, name).
- **Book:** Stores book information (ID, name, score, borrowed by user).
- **Loan:** Tracks borrowing and returning transactions (user ID, book ID, borrowing date, return date).

## Environment Variables

You can set the following environment variables to configure the server:
- **PORT:** The port on which the server will run. Defaults to `3000`.

## Development

To start the backend server in development mode (with auto-restart on changes), run:
```bash
yarn dev
```

For the frontend, React's development mode will automatically restart when changes are detected.

## Conclusion

This project provides a full-featured library management system with persistent data storage using SQLite. It enables users to manage books and borrowing records seamlessly via a React-based frontend and an Express.js-based backend.
