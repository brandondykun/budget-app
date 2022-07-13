import { useState, useEffect } from "react";
import { db } from ".././firebase-config";
import { getDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

const EditTransactionPage = () => {
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState("");
  const [saved, setSaved] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const docRef = doc(db, "transactions", id);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const getTransaction = async () => {
      try {
        const response = await getDoc(docRef);
        if (mounted) {
          const momentDate = moment(response.data().date.seconds * 1000).format(
            "yyyy-MM-DDThh:mm"
          );
          setDate(momentDate);
          setPaid((response.data().paid / 100).toFixed(2));
          setSaved((response.data().saved / 100).toFixed(2));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTransaction();

    return function cleanup() {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!paid) {
      setErrorMessage("Please enter an amount paid.");
      return;
    }
    if (!saved) {
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
      await updateDoc(docRef, {
        date: fTimestamp,
        paid: paid * 100,
        saved: saved * 100,
      });
      navigate(`/details/${id}`);
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a problem with the update. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="page-title">edit</h1>
      <form id="edit-transaction-form" className="form" onSubmit={handleSubmit}>
        <label htmlFor="paid">amount paid</label>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="paid"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        />

        <label htmlFor="saved">amount saved</label>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="saved"
          value={saved}
          onChange={(e) => setSaved(e.target.value)}
        />

        <label htmlFor="date">date</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="form-button" type="submit">
          submit
        </button>
      </form>
      <button
        className="form-button cancel-button"
        onClick={() => navigate(`/details/${id}`)}
      >
        cancel
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditTransactionPage;
