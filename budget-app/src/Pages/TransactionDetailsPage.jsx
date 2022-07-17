import { useParams, useNavigate } from "react-router-dom";
import { db } from ".././firebase-config";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";

const TransactionDetailsPage = () => {
  const [paid, setPaid] = useState("");
  const [saved, setSaved] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

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
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(docRef);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-contents-container">
      <h1 className="page-title">details</h1>
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
        {!confirmDeleteActive && (
          <div className="details-button-container">
            <button
              className="form-button small-button"
              onClick={() => navigate(`/details/${id}/edit`)}
            >
              edit
            </button>
            <button
              className="form-button small-button"
              onClick={() => setConfirmDeleteActive(true)}
            >
              delete
            </button>
          </div>
        )}
        {confirmDeleteActive && (
          <div className="details-button-container">
            <div className="warning-text">
              are you sure you want to delete this entry?
            </div>
            <button className="form-button small-button" onClick={handleDelete}>
              yes
            </button>
            <button
              className="form-button small-button"
              onClick={() => setConfirmDeleteActive(false)}
            >
              no
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
