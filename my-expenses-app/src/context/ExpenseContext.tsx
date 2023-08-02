// src/ExpenseContext.tsx
import React, { createContext, useContext, useState,  useEffect } from 'react';
import axios from 'axios';
import { Expense } from '../data/mockExpenses';


interface ExpenseProviderProps {
    children: React.ReactNode;
  }
  
interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string|undefined) => void;
  // Add other methods as needed
}

const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  // Initialize other methods as needed
});

// eslint-disable-next-line react-refresh/only-export-components
export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Function to fetch expenses from the API and set the initial state
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/expense');
      
      setExpenses(response.data); // Set the context state based on the API response
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Function to add an expense to the context and API
  const addExpense = async (expense: Expense) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/create-expense', expense);
      
      setExpenses([...expenses, { ...expense, id: response.data.id }]); // Update the context state
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Function to delete an expense from the context and API
  const deleteExpense = async (id: string|undefined) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/delete-expense/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id?.localeCompare(id)));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };


  // Add other methods as needed

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
