import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../Auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            navigate("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    });
  };

  return (
    <div>
      <h1 className="page-title">log in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button" type="submit">
          log in
        </button>
      </form>
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};

export default LoginPage;
