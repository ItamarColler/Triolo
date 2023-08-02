import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { container } from 'tsyringe';
import { AuthRoutes } from './routes/authRoutes';
import { ExpenseRoutes } from './routes/expenseRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }as any;
  
  mongoose.connect(process.env.MONGO_URI || '', dbOptions)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware to parse JSON body
app.use(express.json());

// Register routes
container.resolve(AuthRoutes).register(app);
container.resolve(ExpenseRoutes).register(app);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
