import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const tagRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        q: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const q = input.q || "";
      const tags = await ctx.prisma.tag.findMany({
        where: {
          name: { contains: q },
        },
        include: { tagCategory: true },
      });
      return tags;
    }),
});
