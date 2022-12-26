import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <h2>Game Jammers</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <a href="/api/auth/login">Log In</a>
        </li>
        <li>
          <a href="/api/auth/logout">Log Out</a>
        </li>
      </ul>
    </>
  );
}
