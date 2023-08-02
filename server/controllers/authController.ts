import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class AuthController {
  hasToken(req: Request, res: Response): void {
    // Implement JWT authentication logic
    // ...
  }
}
