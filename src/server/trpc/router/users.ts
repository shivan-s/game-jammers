import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
  getById: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: input } });
      return user;
    }),
});
