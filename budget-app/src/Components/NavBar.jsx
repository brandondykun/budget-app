import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="primary-nav">
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/add-transaction">
        Add Transaction
      </NavLink>
    </nav>
  );
};

export default NavBar;
