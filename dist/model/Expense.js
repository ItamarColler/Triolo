"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    category: { type: String, enum: ['Food', 'Transportation', 'Utilities', 'Other'], required: true },
    total: { type: Number, required: true },
    notes: { type: String },
});
exports.ExpenseModel = (0, mongoose_1.model)('Expense', expenseSchema);
