import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar flex flex-wrap items-center justify-between bg-[#801818] py-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/">Game Jams</Link>
          </li>
          <li>
            <Link href="/">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
