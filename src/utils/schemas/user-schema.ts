import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const updateUserSchema = z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    email: z.string().email().optional().nullable(),
})