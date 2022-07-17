import { useState, useRef, useEffect } from "react";
import { addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../Auth";
import { useContext } from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const AddTransactionPage = () => {
  const [savedAmount, setSavedAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputReference = useRef(null);

  const transactionsRef = collection(db, "transactions");

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (!paidAmount) {
      setErrorMessage("Please enter an amount paid.");
      return;
    }
    if (!savedAmount) {
      setErrorMessage("Please enter an amount saved.");
      return;
    }
    if (!date) {
      setErrorMessage("Please enter a date.");
      return;
    }

    try {
      const timeMilliSeconds = Math.floor(new Date(date).getTime());
      const fTimestamp = Timestamp.fromMillis(timeMilliSeconds);

      const data = {
        saved: savedAmount * 100,
        paid: paidAmount * 100,
        date: fTimestamp,
        userId: currentUser.uid,
      };

      await addDoc(transactionsRef, data);
      setDate("");
      setSavedAmount("");
      setPaidAmount("");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a problem. Please Try again.");
    }
  };

  return (
    <div className="page-contents-container">
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
          ref={inputReference}
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AddTransactionPage;
