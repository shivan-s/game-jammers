import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile: NextPage = () => {
  const { data: session } = useSession({ required: true });

  console.log(session);

  return (
    <>
      <div>
        <div>
          <h2 className="text-3xl">{session?.user.name}</h2>{" "}
          <h3 className="text-1xl">@{session?.user.username}</h3>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="text-2xl">
              <>
                <ul>
                  <Image
                    width={120}
                    height={120}
                    alt={session?.user?.name || ""}
                    src={session?.user?.image || ""}
                  />
                </ul>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
