import { Request, Response } from "express";
import { searchComment } from "../../models/comment-model";

export async function searchCommentController(request: Request, response: Response): Promise<Response> {

    try {
        const {postId} = request.params;

        const comment = await searchComment(Number(postId));
        
        return response.status(200).json({ data: comment});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar comment", data: error });
    }
}