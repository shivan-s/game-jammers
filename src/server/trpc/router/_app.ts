import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { gameJamRouter } from "./gamejams";
import { profileRouter } from "./profiles";
import { tagRouter } from "./tags";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  gameJam: gameJamRouter,
  profile: profileRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
