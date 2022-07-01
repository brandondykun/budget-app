import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

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

  return <div className="App"></div>;
}

export default App;
