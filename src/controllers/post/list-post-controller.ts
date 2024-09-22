import { Request, Response } from "express";
import { listPost } from "../../models/post-model";

export async function listPostController(request: Request, response: Response): Promise<Response> {

    try {
        const posts = await listPost();
        
        return response.status(200).json({ data: posts});
    } catch (error) {
        return response.status(400).json({ message: "Erro a listar posts", data: error });
    }
}