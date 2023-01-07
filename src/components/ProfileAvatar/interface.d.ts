interface IProfileAvatar {
  imageSize: string;
  user: UserWithExtraFields & { handle: string };
  ringColorClassName?: string;
}
