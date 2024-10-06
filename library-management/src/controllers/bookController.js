const Book = require('../models/Book');

// Fetch all books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err); 
  }
};

// Add a new book
exports.createBook = async (req, res, next) => {
  try {
    const { name, score } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Book name is required.' });
    }
    const newBook = await Book.create({ name, score: score || -1 });
    res.status(201).json(newBook);
  } catch (err) {
    next(err); 
  }
};

// Fetch book details
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      return res.status(404).json({ error: 'Book not found.' });
    }
  } catch (err) {
    next(err); 
  }
};
