import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { type User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { isPast, isFuture } from "date-fns";

const gameJamWithInclude = Prisma.validator<Prisma.GameJamArgs>()({
  include: {
    teams: {
      include: { teamToUser: { include: { user: true } } },
    },
    hostUsers: true,
  },
});

const listUserWithInclude = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
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

const detailUserWithInclude = Prisma.validator<Prisma.UserArgs>()({
  include: {
    ...listUserWithInclude.include,
    teamToUser: {
      include: {
        team: {
          include: {
            gameJam: gameJamWithInclude,
          },
        },
      },
    },
    tags: true,
  },
});

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
      const filter = {
        name: { contains: q },
        NOT: [{ profile: null }],
      };
      const users = await ctx.prisma.user.findMany({
        where: filter,
        include: listUserWithInclude.include,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });

      const usersCount = await ctx.prisma.user.count({
        where: filter,
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
      const userWithHandle = addUserHandle(userWithConnections);
      // TODO: fix types
      return divideGameJams(userWithHandle);
    }),
});

export type GameJamWithUsers = Prisma.GameJamGetPayload<
  typeof gameJamWithInclude
>;

export type DetailUserExtraFields = Prisma.UserGetPayload<
  typeof detailUserWithInclude
>;

export type ListUserExtraFields = Prisma.UserGetPayload<
  typeof listUserWithInclude
>;

function addUserHandle(user: DetailUserExtraFields | User) {
  return {
    ...user,
    username: user.profile.username,
    handle: "@" + user.profile.username,
  };
}

function addUserConnections(user: DetailUserExtraFields) {
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

function divideGameJams(user: DetailUserExtraFields) {
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
