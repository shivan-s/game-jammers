import { type NextPage } from "next";
import GameJamForm from "./_form";

const UpdateGameJam: NextPage = () => {
  return (
    <div className="container flex flex-col gap-12 px-4 py-4">
      <GameJamForm />
    </div>
  );
};

export default UpdateGameJam;
