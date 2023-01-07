import { type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const profiles = async (res: NextApiResponse) => {
  const users = await prisma.profiles.findMany();
  res.status(200).json(users);
};

export default profiles;
