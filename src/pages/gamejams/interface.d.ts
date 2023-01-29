import { type Prisma } from "@prisma/client";

type GameJameWithIncludes = Prisma.PromiseReturnType<typeof getById>;

interface IGameJamForm {
  csrfToken?: string;
  gameJam?: GameJameWithIncludes;
}
