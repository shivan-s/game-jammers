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
        where: { username: input },
        include: {
          teamToUser: {
            include: {
              team: {
                include: {
                  gameJam: true,
                  teamToUser: { include: { user: true } },
                },
              },
            },
          },
          tags: true,
          programmingLanguages: true,
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
      return addUserHandle(userWithConnections);
    }),
});

// TODO: fix types

const userWithExtraFields = Prisma.validator<Prisma.UserArgs>()({
  include: {
    teamToUser: {
      include: {
        team: {
          include: {
            gameJam: true,
            teamToUser: { include: { user: true } },
          },
        },
      },
    },
    tags: true,
    programmingLanguages: true,
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

type UserWithExtraFields = Prisma.UserGetPayload<typeof userWithExtraFields>;

function addUserHandle(user: User | UserWithExtraFields) {
  return {
    ...user,
    handle: "@" + user.username,
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
    pastGameJams: gameJams.filter(
      ({ startDate, endDate }) => isPast(startDate) && isPast(endDate)
    ),
    futureGameJams: gameJams.filter(
      ({ startDate, endDate }) => isFuture(startDate) && isFuture(endDate)
    ),
  };
}
