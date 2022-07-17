import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from ".././Auth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const inputReference = useRef(null);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/login");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <div className="page-contents-container">
      <h1 className="page-title">sign up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          required
          ref={inputReference}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">confirm password</label>
        <input
          type="password"
          id="confirm-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="form-button" type="submit">
          sign up
        </button>
      </form>
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};

export default SignUpPage;
