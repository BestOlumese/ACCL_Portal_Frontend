import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(1, { message: "The field is required!" }).max(50),
  last_name: z.string().min(1, { message: "The field is required!" }).max(50),
  username: z.string().min(1, { message: "The field is required!" }).max(50),
  password: z
    .string()
    .min(8, { message: "Password must not be less than 8 characters!" }),
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: "The field is required!" }).max(50),
  password: z.string().min(1, { message: "This field is required!" }),
});

export const meetingSchema = z.object({
  title: z.string().min(1, { message: "The field is required!" }).max(200),
  content: z.string().min(1, { message: "The field is required!" }),
  day: z.date().transform((val) => val.toISOString().slice(0, 10)),
  start_time: z.string().min(1, { message: "The field is required!" }),
  end_time: z.string().min(1, { message: "The field is required!" }),
  extra_notes: z.string(),
  room: z.number().refine((value) => value !== 0, {
    message: "You have to select a room",
  }),
});

export const leaveSchema = z
  .object({
    content: z.string().min(1, { message: "The field is required!" }),
    start_date: z.date().transform((val) => val.toISOString().slice(0, 10)),
    end_date: z.date().transform((val) => val.toISOString().slice(0, 10)),
    director: z.number().refine((value) => value !== 0, {
      message: "You have to select a director",
    }),
  })
  .superRefine((values, ctx) => {
    if (values.end_date < values.start_date) {
      ctx.addIssue({
        path: ["end_date"], // Point to the specific field
        message: "End date must be after start date",
      });
    }
  });

export const roomSchema = z.object({
  name: z.string().min(1, { message: "The field is required!" }),
});
