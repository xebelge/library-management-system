const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use(express.json());

// Synchronize the database
sequelize.sync().then(() => {
  console.log('Database and tables created.');
});

// Use routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
