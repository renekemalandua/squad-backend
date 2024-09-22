import { Comment} from "@prisma/client";
import { prisma } from "../database/connection/prisma-client";
import { createCommentDTO } from "../utils/dto/comment-dto";

export async function createComment(request: createCommentDTO): Promise<Comment> {
    const comment = await prisma.comment.create({
        data:{
            desc: request.desc,
            userId: request.userId,
            postId: request.postId
        }
    })

    return comment
}

export async function   searchComment(postId: number): Promise<Comment []> {
    const comment = await prisma.comment.findMany({
        where:{postId},
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
    return comment;
}