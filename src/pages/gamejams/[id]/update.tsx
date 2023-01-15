import { type NextPage } from "next";
import { useRouter } from "next/router";
import CustomError from "../../../components/CustomError";
import { trpc } from "../../../utils/trpc";
import GameJamForm from "../_form";

const UpdateGameJam: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: gameJam,
    error,
    isLoading,
    isSuccess,
    isError,
  } = trpc.gameJam.getById.useQuery(id);

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="container flex flex-col gap-12 px-4 py-4">
        {isError && <CustomError />}
        {isLoading && <>Loading...</>}
        {isSuccess && gameJam && <GameJamForm gameJam={gameJam} />}
      </div>
    </>
  );
};

export default UpdateGameJam;
