import { z } from "zod";

const NewGameJamSchema = {
  name: z
    .string({ required_error: "You must provide a name for the Jam." })
    .min(4, { message: "Name must be longer than 4 characters." })
    .max(50, { message: "Name must be shorter than 50 characters." })
    .trim(),
  description: z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters." })
    .optional(),
  startDate: z.coerce.date({
    required_error: "You must provide a start date.",
  }),
  endDate: z.coerce.date({ required_error: "You must provide an end date." }),
};

export default NewGameJamSchema;
