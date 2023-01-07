import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { TRPCError } from "@trpc/server";

const profileByUsername = async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await createContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    const { username } = req.query;
    const profile = await caller.profile.getByUsername(
      typeof username === "string" ? username : ""
    );
    res.status(200).json(profile);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default profileByUsername;
