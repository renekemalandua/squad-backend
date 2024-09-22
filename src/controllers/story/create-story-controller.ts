import { Request, Response } from "express";
import { createStory } from "../../models/story-model";
import { AppError } from "../../utils/errors/app-error";
import { CloudinaryProvider } from "../../utils/providers/uploadProvider";

export async function createStoryController(request: Request, response: Response): Promise<Response> {

    try{
        const { userId} = request.body;
        const file = request.file;

        if (!file) {
            throw new AppError("Foto não recebida");
          }
    
          const folder = "squad/story"
          const uploader = new CloudinaryProvider()
          const img = await uploader.uploadPhoto(file, folder);

        const story = await createStory(userId, img.secure_url);
        return response.status(201).json({ message: "story criado com sucesso", data: story });
    }
    catch (error) {
        return response.status(400).json({ message: "Erro ao criar story", data: error });
    }
    
}