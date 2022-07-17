// import { addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../Auth";
import { useEffect, useState, useContext } from "react";
import ExpenseList from "../Components/ExpenseList";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ScheduledExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const expensesRef = collection(db, "expenses");

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    let mounted = true;

    const getExpenses = async () => {
      try {
        const expensesQuery = query(
          expensesRef,
          where("userId", "==", currentUser.uid)
        );
        const expenses = await getDocs(expensesQuery);
        const expensesList = expenses.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (mounted) setExpenses(expensesList);
      } catch (error) {
        console.error(error);
      }
    };

    getExpenses();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className="page-contents-container">
      <div className="title-button-container">
        <h1 className="page-title">scheduled expenses</h1>
        <button
          className="form-button add-expense-button"
          onClick={() => navigate("/add-scheduled-expense")}
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
        </button>
      </div>
      <div className="expense-lists-container">
        <ExpenseList expenses={expenses} type={"want"} title={"wants"} />
        <ExpenseList expenses={expenses} type={"need"} title={"needs"} />
      </div>
    </div>
  );
};

export default ScheduledExpensesPage;
