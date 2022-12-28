import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const gameJamRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const gamejams = await ctx.prisma.gameJam.findMany({
      include: {
        teams: true,
      },
    });
    return gamejams;
  }),
  getById: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const gameJam = await ctx.prisma.gameJam.findUnique({
        where: { id: input },
        include: {
          hosts: true,
          hostUsers: true,
          teams: { include: { teamToUser: { include: { user: true } } } },
        },
      });
      return gameJam;
    }),
});
