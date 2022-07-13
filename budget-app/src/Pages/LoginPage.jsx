import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from ".././Auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to={"/"} />;
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
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="current-password">password</label>
        <input
          type="password"
          id="current-password"
          autoComplete="current-password"
          required
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
