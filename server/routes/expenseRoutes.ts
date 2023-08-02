import { Router } from 'express';
import { ExpensesController } from '../controllers/expensesController';
import { ExpenseService } from '../services/expenseService';
import { container } from 'tsyringe';

export class ExpenseRoutes {
  private router = Router();
  private expensesController: ExpensesController;

  constructor() {
    this.expensesController = container.resolve(ExpensesController);
  }

  register(app: Router): void {
    this.router.post('/api/v1/create-expense', this.expensesController.createExpense);
    this.router.delete('/api/v1/delete-expense/', this.expensesController.createExpense);
    this.router.put('/api/v1/edit-expense/:expense-id', this.expensesController.createExpense);
    this.router.get('/api/v1/expense', this.expensesController.getExpenses);
    app.use('/expenses', this.router);
  }
}
