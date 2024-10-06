const express = require('express');
const { getAllBooks, createBook, getBookById } = require('../controllers/bookController');

const router = express.Router();

// Fetch all books
router.get('/', getAllBooks);

// Add a new book
router.post('/', createBook);

// Fetch book details
router.get('/:id', getBookById);

module.exports = router;
