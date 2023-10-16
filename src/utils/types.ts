import z from "zod";

export type optionType = {
  value: string;
  label: string;
};

export type formSchema = z.infer<typeof zFormSchema>;

const zOptionType = z.object({
  value: z.string(),
  label: z.string(),
});

export const validUrlRegex = /(^https?|^ipfs):\/\//;

export const zFormSchema = z
  .object({
    network: z.number().min(1, { message: "Network chain id is required" }),
    name: z.array(zOptionType).nonempty({
      message: "Chapter Name is required",
    }),
    workScope: z.array(zOptionType).nonempty({
      message: "At least one work scope is required",
    }),
    externalUrl: z
      .string()
      // .url({
      //   message: "Invalid URL format URL must start with http:// or https://",
      // })
      .refine((value) => validUrlRegex.test(value), {
        message: "URL must start with http://, https:// or ipfs://",
      }),
    description: z.string().min(1, { message: "Description is required" }),
    contributors: z.array(zOptionType).nonempty({
      message: "At least one contributor is required",
    }),
    workTimeframeStart: z.string().min(1, {
      message: "Work timeframe start is required",
    }),
    workTimeframeEnd: z.string().min(1, {
      message: "Work timeframe end is required",
    }),
  })
  .refine((data) => data.workTimeframeEnd > data.workTimeframeStart, {
    message: "Work timeframe end must be greater than start",
    path: ["workTimeframeEnd"],
  });
