import connectDB from './db/index.js';
import mongoose from 'mongoose';
import app from './app.js';

import dotenv from 'dotenv';
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log('server is listening to', process.env.PORT);
    });
    app.get('/', (req, res) => {
      res.send(
        '<h1>Hello pawar your database is connected and your server is listening to port 8000</h1>'
      );
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!! ');
  });

mongoose.connection.on('connected', () => {
  console.log('Connected to DB:', mongoose.connection.name);
});
