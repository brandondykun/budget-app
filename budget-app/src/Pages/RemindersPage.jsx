import { useState } from "react";
import Reminder from "../Components/Reminder";
import { AuthContext } from "../Auth";
import { useContext, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";

const RemindersPage = () => {
  const [text, setText] = useState("");
  const [reminders, setReminders] = useState([]);
  const inputReference = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const remindersRef = collection(db, "reminders");

  useEffect(() => {
    if (!currentUser) return;

    let mounted = true;
    inputReference.current.focus();

    const getReminders = async () => {
      try {
        const remindersQuery = query(
          remindersRef,
          where("userId", "==", currentUser.uid)
        );
        const reminders = await getDocs(remindersQuery);
        const remindersList = reminders.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (mounted) setReminders(remindersList);
      } catch (error) {
        console.error(error);
      }
    };

    getReminders();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fTimestamp = Timestamp.now();

    const data = {
      complete: false,
      text: text,
      timeCreated: fTimestamp,
      userId: currentUser.uid,
    };

    const response = await addDoc(remindersRef, data);
    if (response.id) {
      const updatedData = { ...data, id: response.id };
      setReminders([...reminders, updatedData]);
    }
    setText("");
  };

  return (
    <div>
      <h1 className="page-title">reminders</h1>
      <form className="form single-row-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="reminder-text-input"
          ref={inputReference}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="form-button add-button" type="submit">
          add
        </button>
      </form>
      <div className="reminders-list-container">
        {reminders?.map((reminder) => {
          return (
            <Reminder
              key={reminder.id}
              reminder={reminder}
              reminders={reminders}
              setReminders={setReminders}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RemindersPage;
