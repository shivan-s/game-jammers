import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { type User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { isPast, isFuture } from "date-fns";

export const userRouter = router({
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
      const users = await ctx.prisma.user.findMany({
        where: { NOT: [{ profile: null }] },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextUser = users.pop();
        nextCursor = nextUser ? nextUser.id : undefined;
      }
      return { users, nextCursor };
    }),

  getByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
        include: {
          profile: true,
          teamToUser: {
            include: {
              team: {
                include: {
                  gameJam: {
                    include: {
                      teams: {
                        include: { teamToUser: { include: { user: true } } },
                      },
                      hostUsers: true,
                    },
                  },
                },
              },
            },
          },
          tags: true,
          connectionRequestSent: {
            where: { accepted: true },
            include: { receiver: true },
          },
          connectionRequestReceived: {
            where: { accepted: true },
            include: { sender: true },
          },
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User is not found",
        });
      }
      const userWithConnections = addUserConnections(user);
      const userWithHandle = addUserHandle(userWithConnections);
      // TODO: fix types
      return divideGameJams(userWithHandle);
    }),
});

const gameJamWithUsers = Prisma.validator<Prisma.GameJamArgs>()({
  include: {
    teams: {
      include: { teamToUser: { include: { user: true } } },
    },
    hostUsers: true,
  },
});

export type GameJamWithUsers = Prisma.GameJamGetPayload<
  typeof gameJamWithUsers
>;

const userWithExtraFields = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
    teamToUser: {
      include: {
        team: {
          include: {
            gameJam: {
              include: {
                teams: {
                  include: { teamToUser: { include: { user: true } } },
                },
                hostUsers: true,
              },
            },
          },
        },
      },
    },
    tags: true,
    connectionRequestSent: {
      where: { accepted: true },
      include: { receiver: true },
    },
    connectionRequestReceived: {
      where: { accepted: true },
      include: { sender: true },
    },
  },
});

export type UserWithExtraFields = Prisma.UserGetPayload<
  typeof userWithExtraFields
>;

function addUserHandle(user: UserWithExtraFields | User) {
  return {
    ...user,
    username: user.profile.username,
    handle: "@" + user.profile.username,
  };
}

function addUserConnections(user: UserWithExtraFields) {
  const usersConnected = user.connectionRequestReceived
    .map(({ sender }) => addUserHandle(sender))
    .concat(
      user.connectionRequestSent.map(({ receiver }) => addUserHandle(receiver))
    );
  return {
    ...user,
    connections: usersConnected,
  };
}

function divideGameJams(user: UserWithExtraFields) {
  const gameJams = user.teamToUser.map(({ team }) => team.gameJam);
  return {
    ...user,
    currentGameJams: gameJams.filter(
      ({ startDate, endDate }) => isPast(startDate) && isFuture(endDate)
    ),
    previousGameJams: gameJams.filter(
      ({ startDate, endDate }) => isPast(startDate) && isPast(endDate)
    ),
    upcomingGameJams: gameJams.filter(
      ({ startDate, endDate }) => isFuture(startDate) && isFuture(endDate)
    ),
  };
}
