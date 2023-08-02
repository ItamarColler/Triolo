// src/services/expenseService.ts
import axios from 'axios';
import { Expense } from '../data/mockExpenses';

const API_BASE_URL = 'http://localhost:3000/'; // Replace with your API URL

export const addExpense = async (expense: Expense) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const deleteExpense = async (expenseId: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(`${API_BASE_URL}/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};
