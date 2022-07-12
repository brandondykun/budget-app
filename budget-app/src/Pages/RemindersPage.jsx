import { useState } from "react";
import Reminder from "../Components/Reminder";
import { addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../Auth";
import { useContext } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

const RemindersPage = () => {
  const [text, setText] = useState("");
  const [reminders, setReminders] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const remindersRef = collection(db, "reminders");

  useEffect(() => {
    if (currentUser) {
      const getReminders = async () => {
        const remindersQuery = query(
          remindersRef,
          where("userId", "==", currentUser.uid)
        );
        const reminders = await getDocs(remindersQuery);
        const remindersList = reminders.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setReminders(remindersList);
      };
      getReminders();
    }
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
          //   placeholder=""
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
