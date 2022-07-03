import { useState } from "react";
import { addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../Auth";
import { useContext } from "react";

const AddTransactionPage = ({
  transactionsRef,
  transactions,
  setTransactions,
}) => {
  const [savedAmount, setSavedAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const timeMilliSeconds = Math.floor(new Date(date).getTime());
    const fTimestamp = Timestamp.fromMillis(timeMilliSeconds);

    const data = {
      saved: savedAmount * 100,
      paid: paidAmount * 100,
      date: fTimestamp,
      userId: currentUser.uid,
    };

    const response = await addDoc(transactionsRef, data);
    if (response.id) {
      const updatedData = { ...data, id: response.id };
      setTransactions([...transactions, updatedData]);
      setDate("");
      setSavedAmount("");
      setPaidAmount("");
      setSuccessMessage("Ayyyyy you gettin rich!");
    }
  };

  return (
    <div>
      <h1 className="page-title">add savings</h1>
      <form id="add-transaction-form" className="form" onSubmit={handleSubmit}>
        <label htmlFor="paid">amount paid</label>
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

        <label htmlFor="saved">amount saved</label>
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

        <label htmlFor="date">date</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="form-button" type="submit">
          add
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddTransactionPage;
