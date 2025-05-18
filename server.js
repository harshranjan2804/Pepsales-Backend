require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('API Running'));
app.get('/notifications', (req, res) => res.send('Notifiactions API Running'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
