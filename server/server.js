const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const apiLimiter = require('./middleware/rateLimitMiddleware');

connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiLimiter);

// All routes   
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes')); 

// Basic route to test the server
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/api/_meta', (req, res) => {
  res.status(200).json({
    version: '1.0.0',
    description: 'HelpDesk Mini API for Hackathon',
  });
});

app.get('/.well-known/hackathon.json', (req, res) => {
  res.status(200).json({
    projectName: 'HelpDesk Mini',
    author: 'Talha Shamo',
    description: 'A simplified ticketing system with role-based access.',
  });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));