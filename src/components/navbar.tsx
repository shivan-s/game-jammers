import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar flex w-full flex-wrap items-center justify-between bg-[#801818] py-4">
        <ul className="navbar-nav list-style-none mr-auto flex pl-0">
          <li className="nav-item p-2">
            <Link className="nav-link text-gray-200 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link
              className="nav-link text-gray-200 hover:underline"
              href="/users"
            >
              Users
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link
              className="nav-link text-gray-200 hover:underline"
              href="/gamejams"
            >
              Game Jams
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link text-gray-200 hover:underline" href="/">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
