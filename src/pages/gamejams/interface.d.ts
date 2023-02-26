import { type Prisma } from "@prisma/client";
import { type Dispatch } from "react";

type GameJameWithIncludes = Prisma.PromiseReturnType<typeof getById>;

interface IGameJamForm {
  csrfToken?: string;
  gameJam?: GameJameWithIncludes;
  gameJamId?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>
}
