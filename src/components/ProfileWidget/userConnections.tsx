const UserConnections = (connections: UserWithExtraFields[]) => {
  return (
    <div className="flex flex-col px-4 py-4">
      {connections.map((connection) => {
        return (
          <div key={connection.id} className="bg-stone-700">
            <ProfileAvatar imageSize="64" user={connection} />
          </div>
        );
      })}
      <div className="flex justify-between gap-2">
        <div className="text-xs">
          {connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"}
        </div>
        <div className="text-xs">N mutual</div>
      </div>
    </div>
  );
};

export default UserConnections;
