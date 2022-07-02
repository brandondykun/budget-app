import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import {
  faHouse,
  faCirclePlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase-config";

const NavBar = () => {
  const logout = (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <nav className="primary-nav">
      <NavLink className="nav-link" to="/">
        <FontAwesomeIcon icon={faHouse} size="lg" />
      </NavLink>
      <NavLink className="nav-link" to="/add-transaction">
        <FontAwesomeIcon icon={faCirclePlus} size="lg" />
      </NavLink>
      <div onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
      </div>
    </nav>
  );
};

export default NavBar;
