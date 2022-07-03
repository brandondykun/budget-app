import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import {
  faHouse,
  faCirclePlus,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faBell,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase-config";
import { AuthContext } from "../Auth";
import { useContext } from "react";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  const logout = (e) => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };
  return (
    <nav className="primary-nav">
      {currentUser && (
        <NavLink className="nav-link" to="/">
          <FontAwesomeIcon icon={faHouse} size="xl" />
        </NavLink>
      )}
      {currentUser && (
        <NavLink className="nav-link" to="/add-transaction">
          <FontAwesomeIcon icon={faCirclePlus} size="xl" />
        </NavLink>
      )}
      {currentUser && (
        <NavLink className="nav-link" to="/reminders">
          <FontAwesomeIcon icon={faListCheck} size="xl" />
        </NavLink>
      )}
      {currentUser && (
        <div className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
        </div>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/login">
          <FontAwesomeIcon icon={faRightToBracket} size="xl" />
        </NavLink>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/sign-up">
          <FontAwesomeIcon icon={faUserPlus} size="xl" />
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
