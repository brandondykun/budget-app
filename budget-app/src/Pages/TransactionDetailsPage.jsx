import { useParams } from "react-router-dom";
import { db } from ".././firebase-config";
import {
  collection,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TransactionDetailsPage = () => {
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState("");
  const [saved, setSaved] = useState("");
  const [editing, setEditing] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

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
          setFormattedDate(new Date(response.data().date.seconds * 1000));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTransaction();

    return function cleanup() {
      mounted = false;
    };
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeMilliSeconds = Math.floor(new Date(date).getTime());
      const fTimestamp = Timestamp.fromMillis(timeMilliSeconds);
      await updateDoc(docRef, {
        date: fTimestamp,
        paid: paid * 100,
        saved: saved * 100,
      });
      setEditing(false);
    } catch (error) {
      console.error(error);
      // TODO Error message
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(docRef);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className="page-title">details</h1>
      {!editing && (
        <div>
          <div className="details-page-text-container">
            <div className="date-text">
              {formattedDate && `date: ${formattedDate.toLocaleDateString()}`}
            </div>
            <div>
              {paid &&
                `paid: $${parseInt(paid)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
            <div>
              {saved &&
                `saved: $${parseInt(saved)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
            <div className="percent-text">
              {saved &&
                paid &&
                `You saved ${parseInt((saved / paid) * 100)}% of this pay!`}
            </div>
          </div>
          <div className="details-button-container">
            <button
              className="form-button small-button"
              onClick={() => setEditing(true)}
            >
              edit
            </button>
            <button className="form-button small-button" onClick={handleDelete}>
              delete
            </button>
          </div>
        </div>
      )}

      {editing && (
        <div>
          <form
            id="edit-transaction-form"
            className="form"
            onSubmit={handleSubmit}
          >
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
            onClick={() => setEditing(false)}
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsPage;
