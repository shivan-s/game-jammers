import { type User } from "@prisma/client";

interface IHosts {
  label: string;
  value: User;
}

interface ISelectedHost {
  value: User;
  label: string;
}
