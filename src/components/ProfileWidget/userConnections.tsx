import {
  type ListUserExtraFields,
  type DetailUserExtraFields,
} from "../../server/trpc/router/users";
import ProfileAvatar from "../ProfileAvatar";

const UserConnections = ({
  connections,
}: DetailUserExtraFields[] | ListUserExtraFields[]) => {
  const LIMIT = 5;
  let connectionsToShow: DetailUserExtraFields[] | ListUserExtraFields[] =
    connections;
  if (connections.length > LIMIT) {
    connectionsToShow = connections.slice(0, 5);
  }
  return (
    <div className="flex flex-col px-4 py-4">
      {connectionsToShow.map((connection) => {
        return (
          <div key={connection.id} className="bg-stone-700">
            <ProfileAvatar imageSize="64" user={connection} />
          </div>
        );
      })}
      <div className="flex justify-between gap-2">
        <div className="text-xs">
          {connections.length === 0 ? "No" : connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"}
        </div>
        <div className="text-xs">N mutual</div>
      </div>
    </div>
  );
};

export default UserConnections;
