import { Request, Response } from "express";
import { CustomError } from "../../utils/errors/custom-error";
import { findUser } from "../../models/user-model";
import { AppError } from "../../utils/errors/app-error";
import { createPostSchema } from "../../utils/schemas/post-schema";
import { createPost } from "../../models/post-model";
import { createPostDTO } from "../../utils/dto/post-dto";
import { CloudinaryProvider } from "../../utils/providers/uploadProvider";

export async function createPostController(request: Request, response: Response): Promise<Response> {

    try{
        const bodydata = createPostSchema.safeParse(request.body);
        const file = request.file;

        if(bodydata.error){
            throw new CustomError(
              "Erro de Validação",
              400,
              bodydata.error.errors.map((error) => `${error.path[0]}: ${error.message}`)
            );
        }

        const user_exist = await findUser(Number(bodydata.data.userId));
        if (!user_exist) {
          throw new AppError("usuario não encontrado");
        }

        if (file) {

          const folder = "squad/post"
          const uploader = new CloudinaryProvider()
          const img = await uploader.uploadPhoto(file, folder);
          
          const user = await createPost({
            desc: bodydata.data.desc,
            userId: Number(bodydata.data.userId),
            photo: img.secure_url
          } as createPostDTO);

          return response.status(201).json({ message: "post criado com sucesso", data: user });
          
        }
       
        const user = await createPost({
          desc: bodydata.data.desc,
          userId: Number(bodydata.data.userId)
        } as createPostDTO);
         
        return response.status(201).json({ message: "post criado com sucesso", data: user });
    }
    catch (error) {
        return response.status(400).json({ message: "Erro ao criar post", data: error });
    }
    
}