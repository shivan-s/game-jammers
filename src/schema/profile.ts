import { z } from "zod";

const ProfileSchema = {
  username: z
    .string({ required_error: "You must have a username." })
    .regex(/^[\w]*$/, {
      message: "Your username can only contain letters, numbers and '_'.",
    })
    .min(4, { message: "Your username must be longer than 4 characters." })
    .max(15, { message: "Your username must be shorter than 15 characters." })
    .trim(),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters." })
    .trim()
    .optional(),
};

export default ProfileSchema;
