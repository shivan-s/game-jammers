import { router, publicProcedure, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EditUserProfileSchema } from "../../../../schema/user";
import {
  type DetailUserExtraFields,
  detailUserWithInclude,
  listUserWithInclude,
} from "./types";
import { addUserConnections, addUserHandle, divideGameJams } from "./helpers";

export const userRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        q: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor } = input;
      const q = input.q || "";
      const limit = input.limit ?? 50;
      const users = await ctx.prisma.user.findMany({
        where: {
          name: { contains: q, mode: "insensitive" },
          NOT: [{ profile: null }],
        },
        include: listUserWithInclude.include,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });

      const usersCount = await ctx.prisma.user.count({
        where: {
          name: { contains: q, mode: "insensitive" },
          NOT: [{ profile: null }],
        },
      });

      const usersWithHandles = users.map((user) => addUserHandle(user));

      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextUser = users.pop();
        nextCursor = nextUser ? nextUser.id : undefined;
      }
      return { users: usersWithHandles, nextCursor, count: usersCount };
    }),

  /* const getUsersByRelevance = await prisma.user.findMany({ */
  /*   take: 10, */
  /*   orderBy: { */
  /*     _relevance: { */
  /*       fields: ['bio'], */
  /*       search: 'developer', */
  /*       sort: 'asc', */
  /*     }, */
  /*   }, */
  /* }) */

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: input },
      include: detailUserWithInclude.include,
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User is not found",
      });
    }
    const userWithConnections = addUserConnections(user);
    const userWithHandle = addUserHandle(
      userWithConnections
    ) as DetailUserExtraFields;
    return divideGameJams(userWithHandle);
  }),

  getByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { profile: { username: input } },
        include: detailUserWithInclude.include,
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User is not found",
        });
      }
      const userWithConnections = addUserConnections(user);
      const userWithHandle = addUserHandle(
        userWithConnections
      ) as DetailUserExtraFields;
      return divideGameJams(userWithHandle);
    }),

  updateById: protectedProcedure
    .input(z.object(EditUserProfileSchema))
    .mutation(async ({ ctx, input }) => {
      const { id, name, image, skillLevel, username, bio, tags } = input;
      const currentImageObj = await ctx.prisma.user.findUnique({
        where: { id: id },
        select: { image: true },
      });

      if (currentImageObj?.image !== image) {
      }
      const user = await ctx.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          image: image,
          skillLevel: skillLevel,
          tags: { set: tags || [] },
          profile: { update: { username: username, bio: bio } },
        },
      });
      return user;
    }),
});
