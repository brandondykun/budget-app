import { useState, useEffect } from "react";
import Expense from "./Expense";

const ExpenseList = ({ expenses, type, title }) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    const filteredList = expenses?.filter((expense) => {
      return expense.type === type;
    });
    setFilteredExpenses(filteredList);
  }, [expenses]);

  return (
    <div className="expense-list-container">
      <div className="expense-list-title">{title}</div>
      {filteredExpenses?.map((expense) => {
        return (
          <Expense
            key={expense.id}
            expense={expense}
            filteredExpenses={filteredExpenses}
            setFilteredExpenses={setFilteredExpenses}
          />
        );
      })}
    </div>
  );
};

export default ExpenseList;
