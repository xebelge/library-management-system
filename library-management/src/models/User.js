const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Loan = require('./Loan');  

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany(Loan, { foreignKey: 'userId' });

Loan.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
