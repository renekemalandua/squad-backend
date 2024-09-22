import { Request, Response } from "express";
import { listStory } from "../../models/story-model";

export async function listStoriesController(request: Request, response: Response): Promise<Response> {

    try {
        
        const stories = await listStory();
        
        return response.status(200).json({ data: stories});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar stories", data: error });
    }
}