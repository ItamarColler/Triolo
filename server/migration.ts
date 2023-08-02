import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { ExpenseModel, IExpense } from './model/Expense';
import { faker } from '@faker-js/faker';
dotenv.config();

async function seedDatabase(): Promise<void> {
  try {
    
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    const numRecordsToInsert = 10; // Change this as per your requirement

    // Clear the existing data
    await ExpenseModel.deleteMany({});

    // Generate and insert new mock data
    for (let i = 0; i < numRecordsToInsert; i++) {
      
      const expense: IExpense = {
        id: faker.string.uuid(),
        date: faker.date.past(),
        category: faker.helpers.arrayElement(['Food', 'Transportation', 'Utilities', 'Other']),
        total: faker.helpers.rangeToNumber({ min: 1, max: 1000 }),
        notes: faker.lorem.sentence(),
      };

      await ExpenseModel.create(expense);
    }

    console.log('Mock data inserted successfully.');

    // Close the database connection
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Invoke the migration function
seedDatabase();
