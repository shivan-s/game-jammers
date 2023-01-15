import { type GameJam } from "@prisma/client";

interface IGameJamForm {
  csrfToken?: string;
  gameJam?: GameJam;
}
