import { type DetailUserExtraFields } from "./types";
import { isPast, isFuture } from "date-fns";
import { type Profile, type User } from "@prisma/client";

export function addUserHandle(
  user: DetailUserExtraFields | (User & { profile: Profile | null })
) {
  return {
    ...user,
    username: user.profile ? user.profile.username : "",
    handle: user.profile ? "@" + user.profile.username : "",
  };
}

export function addUserConnections(user: DetailUserExtraFields) {
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

export function divideGameJams(user: DetailUserExtraFields) {
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
