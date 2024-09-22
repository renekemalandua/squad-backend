import { Request, Response } from "express";
import { findPost } from "../../models/post-model";

export async function findPostController(request: Request, response: Response): Promise<Response> {

    try {
        const {id} = request.params;

        const post = await findPost(Number(id));
        
        return response.status(200).json({ data: post});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar post", data: error });
    }
}