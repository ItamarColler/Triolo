// src/data/mockExpenses.ts
export interface Expense {
    id?: string;
    date: string;
    category: 'Food' | 'Transportation' | 'Utilities' | 'Other';
    total: number;
    notes?: string;
}

