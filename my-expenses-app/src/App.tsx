
import './App.css'
// src/App.tsx
import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpensesPage from './components/ExpensesPage';

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <ExpensesPage onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </ExpenseProvider>
  );
};

export default App;

