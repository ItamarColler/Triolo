import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';
import { container } from 'tsyringe';

export class AuthRoutes {
  private router = Router();
  private authController: AuthController;

  constructor() {
    this.authController = container.resolve(AuthController);
  }

  register(app: Router): void {
    this.router.post('/', this.authController.hasToken);
    app.use('/auth', this.router);
  }
}
