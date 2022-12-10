import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from ".././Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
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

    // setPersistence(auth, browserLocalPersistence).then(() => {
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
    // });
  };

  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="page-contents-container">
      <h1 className="page-title">log in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          required
          ref={inputReference}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="current-password">password</label>

        <div className="password-input-container">
          <input
            type={!passwordVisible ? "password" : "text"}
            id="current-password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="show-password-button" onClick={toggleShowPassword}>
            {!passwordVisible ? (
              <FontAwesomeIcon icon={faEye} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} size="sm" />
            )}
          </span>
        </div>

        <button className="form-button" type="submit">
          log in
        </button>
      </form>
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};

export default LoginPage;
