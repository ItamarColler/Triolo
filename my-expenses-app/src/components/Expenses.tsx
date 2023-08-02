// Expenses.tsx
import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { Expense } from '../data/mockExpenses';

const Expenses: React.FC = () => {
  const { expenses, deleteExpense } = useExpenseContext();

  const handleDelete = (id: string|undefined) => {
    // Call the deleteExpense method from the context to remove the expense from the array
    deleteExpense(id);
  };

  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Total</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expenses: Expense ) => (
            <tr key={expenses.id}>
              <td>{expenses.date}</td>
              <td>{expenses.category}</td>
              <td>{expenses.total}</td>
              <td>{expenses.notes}</td>
              <td>
                <button onClick={() => handleDelete(expenses.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
