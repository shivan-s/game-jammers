import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/tooltip";
import { type User, type Tag, type ProgrammingLanguage } from "@prisma/client";
import { FaLocationArrow, FaUserFriends } from "react-icons/fa";
import { format, formatDistanceToNow } from "date-fns";

const ProfileAvatar = ({
  username,
  image,
  handle,
}: User & { handle: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Image
          className="rounded-full ring-4 ring-stone-700"
          width="45"
          height="45"
          alt={username || ""}
          src={image || ""}
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className="inline-block bg-white py-4 px-2.5">
          <div>
            <h4 className="text-1xl">{handle}</h4>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const User: NextPage = () => {
  const { query } = useRouter();
  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
    // TODO: fix type
  } = trpc.user.getByUsername.useQuery(query.username);

  if (isError) {
    console.log(error);
  }

  // TODO: segment previous, future and current gamejams
  /* const now = new Date(); */
  /* const futureGameJams = gameJamsEntered.filter( */
  /*   (gameJam) => gameJam.startDate < now */
  /* );  */
  /* const currentGameJams */
  /* const previouGameJame */
  /* const gameJamesPast = gameJamsEntered.filter( */
  /*   (gameJam) => gameJam.startDate < now */
  /* ); */

  return (
    <>
      {isError && <>Error!</>}
      {isLoading && <>Loading...</>}
      {isSuccess &&
        (user ? (
          <div className="container flex flex-col gap-12 px-4 py-16">
            <div className="flex flex-col divide-y rounded-xl bg-stone-700">
              <div>
                <div className="flex flex-col justify-between px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Image
                      className="rounded-full"
                      width="72"
                      height="72"
                      alt={user.username || ""}
                      src={user.image || ""}
                    />
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <span>
                          <h2 className="truncate text-2xl">{user?.name}</h2>
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="rounded-full text-xs ring-2 ring-white">
                              {user?.teamToUser.length}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="inline-block bg-white py-4 px-2.5">
                              <div>
                                <h4 className="text-lg">
                                  Game Jams Participated:{" "}
                                  {user?.teamToUser.length}
                                </h4>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-base">{user?.handle}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-base">{user?.bio}</p>
                </div>
                <div>
                  <div className="flex flex-col px-4 py-4">
                    {user?.connections.map((connection) => {
                      return (
                        <>
                          <ProfileAvatar {...connection} />
                        </>
                      );
                    })}
                    <div className="flex justify-between gap-2">
                      <div className="text-xs">
                        {user?.connections.length}{" "}
                        {user?.connections.length === 1
                          ? "connection"
                          : "connections"}
                      </div>
                      <div className="text-xs">N mutuals</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-4 py-4">
                <div>
                  <Tags tags={user.tags} />
                  <ProgrammingLanguages
                    programmingLanguages={user.programmingLanguages}
                  />
                </div>
                <div className="flex flex-row-reverse gap-2">
                  <button className="inline-block rounded-full border border-white px-4 py-2.5 text-sm hover:bg-white hover:text-black">
                    <span className="flex items-center gap-2">
                      <FaUserFriends /> Connect
                    </span>
                  </button>
                  <button className="inline-block rounded-full border border-white px-4 py-2.5 text-sm hover:bg-white hover:text-black">
                    <span className="flex items-center gap-2">
                      <FaLocationArrow /> Message
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-5xl">Current Jams</h4>
                <p className="text-base">
                  Game jams that {user?.username} is currently participating in.
                </p>
              </div>
              <div></div>
              {user?.teamToUser.length === 0 && <p>No GameJams</p>}
              {user?.teamToUser.map(({ team }) => (
                <div
                  key={team.id}
                  className="flex flex-col rounded-xl bg-[#44403c]"
                >
                  <div className="inline-block basis-1/3 bg-[#000000]"></div>
                  <div className="flex basis-2/3">
                    <div className="flex px-10 py-8">
                      <div className="flex flex-col gap-1">
                        <h3 className="truncate text-2xl">
                          {team.gameJam.name}
                        </h3>
                        <p className="truncate text-base">
                          {/* TODO: use set interval - scale for time */}
                          {formatDistanceToNow(team.gameJam.startDate, {
                            includeSeconds: true,
                            addSuffix: true,
                          })}{" "}
                          <strong>&middot;</strong>{" "}
                          {format(team.gameJam.startDate, "MMMM do yyyy")}{" "}
                          &mdash; {format(team.gameJam.endDate, "MMMM do yyyy")}
                        </p>
                        <p className="truncate text-base">
                          {team.gameJam.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      {team.teamToUser.map(({ user }) => {
                        return (
                          <>
                            <ProfileAvatar {...user} />
                          </>
                        );
                      })}
                    </div>
                    <div className="flex bg-[#6b665e]"></div>
                  </div>
                  <Link href={`/gamejams/${team.gameJam.id}`}>link</Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Oops! No User Details to load.</div>
        ))}
    </>
  );
};

export default User;

interface ITags {
  tags: Tag[];
}

const Tags: React.FC<ITags> = (props) => {
  const { tags } = props;
  return (
    // TODO: limit tags displayed
    <div className="flex gap-2">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="inline-block rounded-full bg-[#86efac] px-4 py-2.5 text-sm text-[#20713f]"
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};

interface IProgrammingLanguages {
  programmingLanguages: ProgrammingLanguage[];
}

const ProgrammingLanguages: React.FC<IProgrammingLanguages> = (props) => {
  const { programmingLanguages } = props;
  // TODO: limit languages displayed
  /* if (programmingLanguages.length < 2) { */
  /* } */
  return (
    <div className="flex gap-2">
      {programmingLanguages.map((programmingLanguage) => (
        <div
          key={programmingLanguage.id}
          className="inline-block rounded-full bg-[#bbf7d0] px-4 py-2.5 text-sm text-[#25842c]"
        >
          {programmingLanguage.name}
        </div>
      ))}
    </div>
  );
};
