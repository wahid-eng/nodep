import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from app');
});

app.listen(PORT, () => console.log(`🚀 Application running on http://localhost:${PORT}`));
