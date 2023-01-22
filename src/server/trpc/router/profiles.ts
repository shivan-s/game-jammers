import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import ProfileSchema from "../../../schema/profile";

const profileWithIncludes = Prisma.validator<Prisma.ProfileArgs>()({
  include: {
    user: true,
  },
});

export const profileRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const profiles = await ctx.prisma.profile.findMany({
        take: limit + 1,
        include: profileWithIncludes.include,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      const profilesWithHandles = profiles.map((profile) =>
        addProfileHandle(profile)
      );
      let nextCursor: typeof cursor | undefined = undefined;
      if (profiles.length > limit) {
        const nextProfile = profiles.pop();
        nextCursor = nextProfile ? nextProfile.id : undefined;
      }
      return { profilesWithHandles, nextCursor };
    }),

  getByUserId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: { userId: input },
        include: {
          user: { include: { tags: { include: { tagCategory: true } } } },
        },
      });
      return profile;
    }),

  getByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: { username: input },
        include: {
          user: true,
        },
      });
      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User is not found",
        });
      }
      return profile;
    }),

  createOrUpdate: protectedProcedure
    .input(z.object({ userId: z.string(), ...ProfileSchema }))
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          username: input.username,
          bio: input.bio,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
        update: {
          username: input.username,
          bio: input.bio,
        },
      });
      return profile;
    }),
});

export type ProfileWithExtraFields = Prisma.ProfileGetPayload<
  typeof profileWithIncludes
>;

function addProfileHandle(profile: ProfileWithExtraFields) {
  return {
    ...profile,
    user: {
      ...profile.user,
      username: profile.username,
      handle: "@" + profile.username,
    },
  };
}
