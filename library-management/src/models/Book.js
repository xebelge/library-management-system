const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Loan = require('./Loan'); 

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: -1
  },
  borrowedBy: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  }
});

Book.hasMany(Loan, { foreignKey: 'bookId' });

Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Book;
