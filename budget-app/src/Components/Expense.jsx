import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Expense = ({ expense, filteredExpenses, setFilteredExpenses }) => {
  const formattedPrice = (expense.price / 100).toFixed(2);

  const expenseRef = doc(db, "expenses", expense.id);

  const handleDelete = async (e) => {
    try {
      await deleteDoc(expenseRef, expense.id);
      setFilteredExpenses(
        filteredExpenses.filter((ex) => {
          return ex.id !== expense.id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="expense-container">
      <div className="expense-text-container">
        <div>&bull; {expense.description}</div>
        <div>${formattedPrice}</div>
      </div>
      <div className="expense-trash-button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} size="sm" />
      </div>
    </div>
  );
};

export default Expense;
