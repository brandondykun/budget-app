import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../Auth";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddScheduledExpensePage = () => {
  const [price, setPrice] = useState("");
  const [type, setType] = useState("want");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputReference = useRef(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const expensesRef = collection(db, "expenses");

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!text) {
      setErrorMessage("Please enter a description.");
      return;
    }
    if (!price) {
      setErrorMessage("Please enter a price.");
      return;
    }

    try {
      const fTimestamp = Timestamp.now();

      const data = {
        description: text,
        price: price * 100,
        timeCreated: fTimestamp,
        type: type,
        userId: currentUser.uid,
      };

      await addDoc(expensesRef, data);
      setText("");
      navigate("/scheduled-expenses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">add scheduled expense</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="expense-text-input">description</label>
        <input
          type="text"
          id="expense-text-input"
          maxLength={50}
          placeholder="new phone...."
          ref={inputReference}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="price">price</label>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="price"
          placeholder="200.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="type">want or need?</label>
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="want">i want this</option>
          <option value="need">i need this</option>
        </select>
        <button className="form-button add-button" type="submit">
          add
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AddScheduledExpensePage;
