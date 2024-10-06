const express = require('express');
const { getAllUsers, createUser, getUserById, getUserBooks, borrowBook, returnBook } = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

// Get user by ID
router.get('/:id', getUserById);

// Fetch books borrowed by a user
router.get('/:userId/books', getUserBooks);

// User borrows a book
router.post('/:userId/borrow/:bookId', borrowBook);

// User returns a book
router.post('/:userId/return/:bookId', returnBook);

module.exports = router;
