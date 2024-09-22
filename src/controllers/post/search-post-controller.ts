import { Request, Response } from "express";
import { searchPost } from "../../models/post-model";

export async function searchPostController(request: Request, response: Response): Promise<Response> {

    try {
        const {userId} = request.params;

        const post = await searchPost(Number(userId));
        
        return response.status(200).json({ data: post});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar post", data: error });
    }
}