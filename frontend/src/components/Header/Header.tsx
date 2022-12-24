import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      <h2>Game Jammers</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/registration">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
