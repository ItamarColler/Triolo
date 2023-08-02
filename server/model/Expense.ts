import { model, Schema } from 'mongoose';

export interface IExpense {
  id:string
  date: Date;
  category: 'Food' | 'Transportation' | 'Utilities' | 'Other';
  total: number;
  notes?: string;
}

const expenseSchema = new Schema<IExpense>({
    id: { type: String, required: true },
    date: { type: Date, required: true },
  category: { type: String, enum: ['Food', 'Transportation', 'Utilities', 'Other'], required: true },
  total: { type: Number, required: true },
  notes: { type: String },
});

export const ExpenseModel = model<IExpense>('Expense', expenseSchema);
