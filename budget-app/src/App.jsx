import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import HomePage from "./Pages/HomePage";
import AddTransactionPage from "./Pages/AddTransactionPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const [transactions, setTransactions] = useState(null);

  const transactionsRef = collection(db, "transactions");

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await getDocs(transactionsRef);
      const transactionsList = transactions.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("transactions list: ", transactionsList);
      setTransactions(transactionsList);
    };
    getTransactions();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage transactions={transactions} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-transaction" element={<AddTransactionPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
