import { Prisma } from "@prisma/client";

export const gameJamWithInclude = Prisma.validator<Prisma.GameJamArgs>()({
  include: {
    teams: {
      include: { teamToUser: { include: { user: true } } },
    },
    hostUsers: true,
  },
});

export const listUserWithInclude = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
    connectionRequestSent: {
      where: { accepted: true },
      include: { receiver: { include: { profile: true } } },
    },
    connectionRequestReceived: {
      where: { accepted: true },
      include: { sender: { include: { profile: true } } },
    },
  },
});

export const detailUserWithInclude = Prisma.validator<Prisma.UserArgs>()({
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
    tags: { include: { tagCategory: true } },
  },
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
