const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Student Notes Manager API is running' });
});

app.use('/api/notes', noteRoutes);

app.use(errorHandler);

module.exports = app;
