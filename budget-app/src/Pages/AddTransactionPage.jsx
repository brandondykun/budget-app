import { useState } from "react";
import { addDoc, Timestamp } from "firebase/firestore";

const AddTransactionPage = ({ transactionsRef }) => {
  const [savedAmount, setSavedAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeMilliSeconds = Math.floor(new Date(date).getTime());
    const fTimestamp = Timestamp.fromMillis(timeMilliSeconds);

    const data = {
      saved: savedAmount * 100,
      paid: paidAmount * 100,
      date: fTimestamp,
    };

    await addDoc(transactionsRef, data);
  };

  return (
    <div>
      <h1 className="page-title">Add Transaction</h1>
      <form id="add-transaction-form" onSubmit={handleSubmit}>
        <label htmlFor="paid">Amount Paid</label>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="paid"
          placeholder="1000.00"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
        />

        <label htmlFor="saved">Amount Saved</label>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="saved"
          placeholder="200.00"
          value={savedAmount}
          onChange={(e) => setSavedAmount(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="add-transaction-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
