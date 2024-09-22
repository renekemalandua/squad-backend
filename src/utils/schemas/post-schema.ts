import { z } from "zod";

export const createPostSchema = z.object({
    desc: z.string(),
    userId: z.string()
})