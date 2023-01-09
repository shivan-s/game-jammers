import { signIn, signOut, useSession } from "next-auth/react";
import { IoMdHome } from "@react-icons/all-files/io/IoMdHome";
import { FaCalendarPlus } from "@react-icons/all-files/fa/FaCalendarPlus";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import Link from "next/link";
import { NavbarItem } from "./navbarItem";

const navbarItems: INavbarItem[] = [
  {
    url: "/",
    label: "Home",
    icon: IoMdHome,
  },
  {
    url: "/gamejams",
    label: "Jams",
    icon: FaCalendarPlus,
  },
  {
    url: "/members",
    label: "Members",
    icon: FaUsers,
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <nav className="flex flex-col gap-3 rounded px-4 py-4">
        <h3 className="text-bold text-3xl">
          <Link href="/">Game Jammers</Link>
        </h3>
        <ul className="flex flex-col gap-2">
          {navbarItems.map((navBarItem, idx) => (
            <NavbarItem key={idx} {...navBarItem} />
          ))}
          <li>
            <button
              className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/60"
              onClick={session ? () => signOut() : () => signIn()}
            >
              {session ? "Sign out" : "Sign in for early access"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
