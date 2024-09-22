import { z } from "zod";

export const createCommentSchema = z.object({
    desc: z.string(),
    userId: z.number(),
    postId: z.number()
})