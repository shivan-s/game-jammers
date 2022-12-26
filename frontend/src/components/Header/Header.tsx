import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../helpers/store";

const Header: React.FC = () => {
  const isAuth = useStore((state) => state.isAuthenticated);
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
        {isAuth ? (
          <>
            <li>Profile</li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/registration">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Header;
