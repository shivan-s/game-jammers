import Image from "next/image";
import { useRouter } from "next/router";

const ProfileImage = ({
  imageSize,
  user,
  ringColorClassName,
}: IProfileAvatar) => {
  const router = useRouter();
  const width = Number(imageSize);
  const height = Number(imageSize);
  return (
    <Image
      className={`rounded-full ring-4 ${ringColorClassName || "ring-current"}`}
      width={width}
      height={height}
      alt={user.username}
      src={user.image}
      onClick={() => router.push(`/${user.username}`)}
    />
  );
};

export default ProfileImage;
