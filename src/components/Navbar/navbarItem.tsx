import Link from "next/link";
import { useRouter } from "next/router";

export const NavbarItem = ({ url, label, icon }: INavbarItem) => {
  const router = useRouter();
  const Icon = icon;
  return (
    <li
      className={`rounded transition hover:bg-stone-500 ${
        router.pathname === url && "bg-stone-500 hover:bg-stone-400"
      }`}
    >
      <Link href={url}>
        <span className="flex items-center gap-3 px-4 py-2.5">
          <Icon />
          {label}
        </span>
      </Link>
    </li>
  );
};
