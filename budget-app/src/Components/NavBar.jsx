import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import {
  faHouse,
  faCirclePlus,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase-config";
import { AuthContext } from "../Auth";
import { useContext } from "react";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  const logout = (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="primary-nav">
      {currentUser && (
        <NavLink className="nav-link" to="/">
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </NavLink>
      )}
      {currentUser && (
        <NavLink className="nav-link" to="/add-transaction">
          <FontAwesomeIcon icon={faCirclePlus} size="lg" />
        </NavLink>
      )}
      {currentUser && (
        <div className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </div>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/login">
          <FontAwesomeIcon icon={faRightToBracket} size="lg" />
        </NavLink>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/sign-up">
          <FontAwesomeIcon icon={faUserPlus} size="lg" />
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
