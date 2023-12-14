import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import mongoose

import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)


// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB)
    console.log('Connected to database successfully');
  } catch (error) {
    console.error('Could not connect to the database:', error);
  }
};

app.get('/', (req, res) => {
  res.send('API is working');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
