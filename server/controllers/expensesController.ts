import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class ExpensesController {
  createExpense(req: Request, res: Response): void {
    // Implement creating an expense logic
    // ...
    console.log(req)

  }
  getExpenses(req: Request, res: Response): void {
    // Implement getting expenses logic
    // ...
    console.log(req)
  }
  putExpenses(req: Request, res: Response): void {
    // Implement getting expenses logic
    // ...
    console.log(req)
  }
  deleteExpense(req: Request, res: Response): void {
    // Implement getting expenses logic
    // ...
    console.log(req)
  }
}
