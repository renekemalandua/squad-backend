import { Request, Response } from "express";
import { AppError } from "../../utils/errors/app-error";
import { deletePost, findPost } from "../../models/post-model";

export async function deletePostController(request: Request, response: Response): Promise<Response> {

    try {
        const {id} = request.params;

        const post = await findPost(Number(id));

        if(!post){
            throw new AppError("post não encontrado")
        }
        
        await deletePost(post.id);

        return response.status(200).json({ message: "post deletado com sucesso"});
    } catch (error) {
        return response.status(400).json({ message: "Erro ao deletar post", data: error });
    }
}