import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const users = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextUser = users.pop();
        nextCursor = nextUser!.id;
      }
      return { users, nextCursor };
    }),
  getById: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
        include: {
          teamToUser: { include: { team: { include: { gameJam: true } } } },
        },
      });
      return user;
    }),
});
