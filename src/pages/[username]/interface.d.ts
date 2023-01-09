import { type GameJamWithUsers } from "../../server/trpc/router/users";

interface GameJamProps {
  username: string;
  gameJams: GameJamWithUsers[];
  state: "current" | "previous" | "upcoming";
}
