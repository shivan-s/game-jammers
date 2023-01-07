import { type UserWithExtraFields } from "../../server/trpc/router/users";
import DisplayTag from "../DisplayTag";

const UserDisplayTags = ({ tags }: UserWithExtraFields) => {
  // Need to add limits for numbers
  return tags.map((tag) => <DisplayTag key={tag.id} {...tag} />);
};

export default UserDisplayTags;
