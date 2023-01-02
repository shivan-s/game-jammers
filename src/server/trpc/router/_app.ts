import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { gameJamRouter } from "./gamejams";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  gameJam: gameJamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
