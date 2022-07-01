import { useState } from "react";

const AddTransactionPage = () => {
  const [savedAmount, setSavedAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Add Transaction Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="paid">Paid</label>

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
        <label htmlFor="saved">Saved</label>

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

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
