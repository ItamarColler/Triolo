import React, { useState, useEffect } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Expense } from "../data/mockExpenses";
import './ExpensesPage.css';
import Expenses from "./Expenses";

interface ExpenseFormProps {
  onClose: () => void;
  expenseToEdit?: Expense; // Expense interface should be defined based on your model
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onClose,
  expenseToEdit,
}) => {
  const { addExpense } = useExpenseContext();
  const [formData, setFormData] = useState<Expense>({
    // Initial state for the form fields
    id: "",
    date: new Date().toDateString().split(":")[1],
    category: "Food",
    total: 1,
    notes: "Hiii",
  });

  useEffect(() => {
    // Populate the form fields with the expense data when editing
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    }
  }, [expenseToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expenseToEdit) {
      // Call your API to update the expense
      // After the update is successful, close the modal
      onClose();
    } else {
      // Call your API to add the new expense
      // After the addition is successful, close the modal
      addExpense(formData);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          <div className="form-items">
          <div className="description">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <label htmlFor="total">Total</label>
            <input
              type="number"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <label htmlFor="total">Id</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit">
              {expenseToEdit ? "Update Expense" : "Add Expense"}
            </button>
          </div>
          </div>
     
        </form>
        <Expenses/>
      </div>
    </div>
  );
};

export default ExpenseForm;
