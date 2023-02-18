import { useRouter } from "next/router";
import Button from "../../../components/Button";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { trpc } from "../../../utils/trpc";
import { type GameJam } from "@prisma/client";

// TODO:
// Write a confirmation for deletion.

interface IDeleteGameJam {
  gameJam: GameJam;
  sessionUserId: string;
}
const DeleteGameJam = ({ gameJam, sessionUserId }: IDeleteGameJam) => {
  const router = useRouter();
  const { mutate: deleteGameJam } = trpc.gameJam.delete.useMutation({
    onSuccess: () => router.push(`/gamejams/`),
  });

  return (
    <Button
      isPrimary
      isDanger
      onClick={() =>
        deleteGameJam({
          id: gameJam?.id as string,
          userId: sessionUserId,
        })
      }
    >
      <MdDelete />
      Delete
    </Button>
  );
};

export default DeleteGameJam;
