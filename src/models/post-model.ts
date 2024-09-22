import { Post } from "@prisma/client";
import { createPostDTO } from "../utils/dto/post-dto";
import { prisma } from "../database/connection/prisma-client";

export async function createPost(request: createPostDTO): Promise<Post> {
    const post = await prisma.post.create({
        data:{
            desc: request.desc,
            userId: request.userId,
            ...(request.photo && {
                photo: request.photo
            })
        },
        include:{
            User:{
                select:{
                    name: true,
                    photo: true
                }
            }
        }
    })
    
    return post;
}

export async function   listPost(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
        include:{
            User:{
                select:{
                    name: true,
                    photo: true
                }
            }
        },
        orderBy:{
            created_at: "desc"
        }
    });
    return posts;
}

export async function   findPost(id: number): Promise<Post | null> {
    const post = await prisma.post.findUnique({
        where:{id},
        include:{
            User:{
                select:{
                    name: true,
                    photo: true
                }
            }
        }
    });
    return post;
}

export async function   searchPost(userId: number): Promise<Post []> {
    const posts = await prisma.post.findMany({where:{userId}});
    return posts;
}

export async function deletePost(id: number) {
    await prisma.post.delete({where:{id}})
}