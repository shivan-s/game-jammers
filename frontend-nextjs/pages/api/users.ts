import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import apiClient from "../../helpers/axios";

export default withApiAuthRequired(async function users(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: [],
  });
  const response = await apiClient.get("/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const users = response.data;
  res.status(200).json(users);
});
