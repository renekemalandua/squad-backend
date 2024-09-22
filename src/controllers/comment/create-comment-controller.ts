import { Request, Response } from "express";
import { CustomError } from "../../utils/errors/custom-error";
import { createCommentSchema } from "../../utils/schemas/comment-schema";
import { createComment } from "../../models/comment-model";
import { createCommentDTO } from "../../utils/dto/comment-dto";

export async function createCommentController(request: Request, response: Response): Promise<Response> {

    try{
        const bodydata = createCommentSchema.safeParse(request.body);
        if(bodydata.error){
            throw new CustomError(
              "Erro de Validação",
              400,
              bodydata.error.errors.map((error) => `${error.path[0]}: ${error.message}`)
            );
        }

        const user = await createComment({
          desc: bodydata.data.desc,
          userId: bodydata.data.userId,
          postId: bodydata.data.postId,
        } as createCommentDTO);
        
        return response.status(201).json({ message: "comment criado com sucesso", data: user });
    }
    catch (error) {
        return response.status(400).json({ message: "Erro ao criar comment", data: error });
    }
    
}