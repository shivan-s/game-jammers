import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const TagWithInclude = Prisma.validator<Prisma.TagArgs>()({
  include: {
    tagCategory: true,
  },
});

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
          name: { contains: q, mode: "insensitive" },
        },
        include: TagWithInclude.include,
        orderBy: [{ name: "asc" }],
      });
      return tags;
    }),
});
