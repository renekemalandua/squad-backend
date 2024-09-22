
import { Story } from "@prisma/client";
import { prisma } from "../database/connection/prisma-client";

export async function createStory(userId: number, photo: string): Promise<Story> {
    const story = await prisma.story.create({
        data:{
            photo,
            userId
        }
    })

    return story
}

export async function   listStory(): Promise<Story[]> {
    const story = await prisma.story.findMany();
    return story;
}