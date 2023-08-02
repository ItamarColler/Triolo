"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = require("express");
const expensesController_1 = require("../controllers/expensesController");
const tsyringe_1 = require("tsyringe");
class ExpenseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.expensesController = tsyringe_1.container.resolve(expensesController_1.ExpensesController);
    }
    register(app) {
        this.router.post('/', this.expensesController.createExpense);
        this.router.get('/', this.expensesController.getExpenses);
        app.use('/expenses', this.router);
    }
}
exports.ExpenseRoutes = ExpenseRoutes;
