import { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { db } from "./firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import HomePage from "./Pages/HomePage";
import AddTransactionPage from "./Pages/AddTransactionPage";
import LoginPage from "./Pages/LoginPage";
import NavBar from "./Components/NavBar";
import SignUpPage from "./Pages/SignUpPage";
import { AuthContext } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import RemindersPage from "./Pages/RemindersPage";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const transactionsRef = collection(db, "transactions");
  const remindersRef = collection(db, "reminders");

  useEffect(() => {
    if (currentUser) {
      const getUserData = async () => {
        const transactionsQuery = query(
          transactionsRef,
          where("userId", "==", currentUser.uid)
        );
        const remindersQuery = query(
          remindersRef,
          where("userId", "==", currentUser.uid)
        );

        const transactions = await getDocs(transactionsQuery);
        const reminders = await getDocs(remindersQuery);

        const transactionsList = transactions.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const remindersList = reminders.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTransactions(transactionsList);
        setReminders(remindersList);
      };
      getUserData();
    }
  }, [currentUser]);

  return (
    <div className="App">
      <Router>
        <div className="primary-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                exact
                path="/"
                element={<HomePage transactions={transactions} />}
              />
            </Route>
            <Route exact path="/add-transaction" element={<PrivateRoute />}>
              <Route
                exact
                path="/add-transaction"
                element={
                  <AddTransactionPage
                    transactionsRef={transactionsRef}
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                }
              />
            </Route>
            <Route exact path="/reminders" element={<PrivateRoute />}>
              <Route
                exact
                path="/reminders"
                element={
                  <RemindersPage
                    reminders={reminders}
                    setReminders={setReminders}
                    remindersRef={remindersRef}
                  />
                }
              />
            </Route>
          </Routes>
        </div>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
