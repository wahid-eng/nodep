// import require packages
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'

// load environment variables from .env
dotenv.config();

// initialize application
const app = express();
const PORT = process.env.PORT || 3000;

// database connection
connectDB();

// define middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// application routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from app');
});

// start the application
app.listen(PORT, () => console.log(`🚀 Application is running on http://localhost:${PORT}`));