import z from "zod";


export type optionType = {
    value: string;
    label: string;
}

export type formSchema = z.infer<typeof zFormSchema>;


const zOptionType = z.object({
    value: z.string(),
    label: z.string(),
});

export const zFormSchema = z.object({
    name: z.array(zOptionType).nonempty({
        message: "Chapter Name is required",
    }),
    workScope: z.array(zOptionType).nonempty({
        message: "At least one work scope is required",
    }),
    externalUrl: z.string().url({
        message:
            "Invalid URL. Please ensure it follows http(s)://www.example.com format",
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
}).refine((data) => data.workTimeframeEnd > data.workTimeframeStart, {
    message: "Work timeframe end must be greater than start",
    path: ["workTimeframeEnd"],
});