import { z } from "zod";
export const NoteSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .nonempty({ message: "Title cannot be empty" })
    .trim()
    .min(5, { message: "Title must be at least 5 characters long" }),

  tags: z
    .array(z.string().min(1))
    .min(1, { message: "You must provide at least one tag" }) // Validate array directly
    .or(
      z
        .string()
        .nonempty({
          message:
            "Tags field cannot be empty. Please enter tags separated by commas.",
        }) // Ensure the input is not empty
        .transform((val) => val.replace(/,+$/, "")) // Remove trailing commas
        .transform((val) => val.split(",")) // Convert to an array
        .pipe(
          z
            .array(
              z.string().nonempty({ message: "Each tag must not be empty" })
            ) // Ensure each tag is non-empty
            .min(1, { message: "You must provide at least one tag" }) // Ensure at least one tag exists
        )
    ),

  content: z
    .string()
    .nonempty({ message: "Content cannot be empty" }) // Ensure the field is not empty
    .min(5, { message: "Content must be at least 5 characters long" }), // Enforce a minimum length
  isSaved: z.boolean(),
});

export type NoteSchemaFields = z.infer<typeof NoteSchema>;
