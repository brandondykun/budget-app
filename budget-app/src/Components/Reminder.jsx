import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";

const Reminder = ({ reminder, reminders, setReminders }) => {
  const [checked, setChecked] = useState(reminder.complete);
  const reminderRef = doc(db, "reminders", reminder.id);

  const handleChange = (e) => {
    const updatedReminders = reminders.map((r) => {
      return r.id === reminder.id ? { ...r, complete: !r.complete } : r;
    });
    setReminders(updatedReminders);
    setChecked(!checked);
    updateDoc(reminderRef, {
      complete: !checked,
    }).catch((error) => console.log("ERROR: ", error));
  };

  const handleDelete = (e) => {
    setReminders(
      reminders.filter((rem) => {
        return rem.id !== reminder.id;
      })
    );
    deleteDoc(reminderRef, reminder.id).catch((error) =>
      console.log("ERROR: ", error)
    );
  };

  return (
    <div
      className={`reminder-container poppins-font ${checked ? "checked" : ""}`}
    >
      <div className="checkbox-text-container">
        <input
          className="reminder-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        ></input>
        <div>{reminder.text}</div>
      </div>
      <div className="trash-can" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} size="sm" />
      </div>
    </div>
  );
};

export default Reminder;
