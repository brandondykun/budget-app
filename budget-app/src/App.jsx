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
  const [transactions, setTransactions] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const transactionsRef = collection(db, "transactions");

  useEffect(() => {
    if (currentUser) {
      const getTransactions = async () => {
        const q = query(
          transactionsRef,
          where("userId", "==", currentUser.uid)
        );
        const transactions = await getDocs(q);
        const transactionsList = transactions.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTransactions(transactionsList);
      };
      getTransactions();
    }
  }, [currentUser]);

  return (
    <div className="App">
      {console.log("CURRENT USER: ", currentUser)}
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
                  <AddTransactionPage transactionsRef={transactionsRef} />
                }
              />
            </Route>
            <Route exact path="/reminders" element={<PrivateRoute />}>
              <Route exact path="/reminders" element={<RemindersPage />} />
            </Route>
          </Routes>
        </div>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
