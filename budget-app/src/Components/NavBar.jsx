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
          <FontAwesomeIcon className="link-icon" icon={faHouse} size="xl" />
          <div className="nav-link-text">home</div>
        </NavLink>
      )}
      {currentUser && (
        <NavLink className="nav-link" to="/add-transaction">
          <FontAwesomeIcon
            className="link-icon"
            icon={faCirclePlus}
            size="xl"
          />
          <div className="nav-link-text">add pay</div>
        </NavLink>
      )}
      {currentUser && (
        <NavLink className="nav-link" to="/reminders">
          <FontAwesomeIcon className="link-icon" icon={faListCheck} size="xl" />
          <div className="nav-link-text">reminders</div>
        </NavLink>
      )}
      {currentUser && (
        <div className="nav-link" onClick={logout}>
          <FontAwesomeIcon
            className="link-icon"
            icon={faRightFromBracket}
            size="xl"
          />
          <div className="nav-link-text">log out</div>
        </div>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/login">
          <FontAwesomeIcon
            className="link-icon"
            icon={faRightToBracket}
            size="xl"
          />
          <div className="nav-link-text">log in</div>
        </NavLink>
      )}
      {!currentUser && (
        <NavLink className="nav-link" to="/sign-up">
          <FontAwesomeIcon className="link-icon" icon={faUserPlus} size="xl" />
          <div className="nav-link-text">sign up</div>
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
