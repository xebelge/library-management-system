const User = require('../models/User');
const Loan = require('../models/Loan');
const Book = require('../models/Book');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err); 
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'User name is required.' });
    }
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (err) {
    next(err); 
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const loans = await Loan.findAll({ where: { userId: user.id }, include: [Book] });
    const currentBooks = loans.filter(loan => !loan.returnedAt).map(loan => loan.Book);
    const previousBorrowedBooks = loans.filter(loan => loan.returnedAt).map(loan => ({
      book: loan.Book,
      returnedAt: loan.returnedAt,
    }));

    res.json({
      id: user.id,
      name: user.name,
      currentBooks,
      previousBorrowedBooks,
    });
  } catch (err) {
    next(err); 
  }
};

// Fetch user's borrowed books
exports.getUserBooks = async (req, res, next) => {
  try {
    const loans = await Loan.findAll({ where: { userId: req.params.userId, returnedAt: null } });
    const bookIds = loans.map(loan => loan.bookId);
    
    const books = await Book.findAll({ where: { id: bookIds } });
    res.json(books);
  } catch (err) {
    next(err); 
  }
};

// User borrows a book
exports.borrowBook = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const book = await Book.findByPk(req.params.bookId);
    
    if (!user || !book) {
      return res.status(404).json({ error: 'User or book not found.' });
    }

    // Check if the book is already borrowed
    if (book.borrowedBy) {
      return res.status(400).json({ error: 'This book is already borrowed by another user.' });
    }

    // Set the book as borrowed by the user
    book.borrowedBy = user.id;
    await book.save();
    
    // Create a loan record
    await Loan.create({
      userId: user.id,
      bookId: book.id,
      borrowedAt: new Date(),
    });

    res.status(200).json({ message: `Book borrowed by ${user.name}.` });
  } catch (err) {
    next(err);
  }
};

// User returns a book
exports.returnBook = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const book = await Book.findByPk(req.params.bookId);
    
    if (!user || !book) {
      return res.status(404).json({ error: 'User or book not found.' });
    }

    if (book.borrowedBy !== user.id) {
      return res.status(400).json({ error: 'This book was not borrowed by this user.' });
    }

    book.borrowedBy = null; 
    await book.save();

    const loan = await Loan.findOne({ where: { userId: user.id, bookId: book.id, returnedAt: null } });
    if (loan) {
      loan.returnedAt = new Date();
      await loan.save();
    }

    res.status(200).json({ message: `Book returned successfully.` });
  } catch (err) {
    next(err); 
  }
};
