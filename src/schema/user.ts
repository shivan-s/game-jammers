import { z } from "zod";
import ProfileSchema from "./profile";

export const UserSchema = {
  name: z
    .string({ required_error: "You must have a username." })
    .regex(/[\w]*/, {
      message: "Your username can only contain letters.",
    })
    .max(50, { message: "Your username must be shorter than 15 characters." })
    .trim()
    .optional(),
  email: z
    .string({ required_error: "You must have an email." })
    .email({ message: "Enter a correct email." })
    .trim(),
  image: z.string().optional(),
  skillLevel: z.union([
    z.literal("NEW"),
    z.literal("BEGINNER"),
    z.literal("INTERMEDIATE"),
    z.literal("VETERAN"),
    z.literal("PROFESSIONAL"),
  ]),
};

export default UserSchema;

export const EditUserProfileSchema = {
  id: z.string(),
  ...UserSchema,
  ...ProfileSchema,
  tags: z.array(z.object({ id: z.string() })),
};
