import { Request, Response } from "express";
import { createUserSchema } from "../../utils/schemas/user-schema";
import { CustomError } from "../../utils/errors/custom-error";
import { createUser, findUser } from "../../models/user-model";
import { createUserDTO } from "../../utils/dto/user-dto";
import { AppError } from "../../utils/errors/app-error";
import { hash } from "bcrypt";


export async function createUserController(request: Request, response: Response): Promise<Response> {

    try{
        const bodydata = createUserSchema.safeParse(request.body);
        if(bodydata.error){
            throw new CustomError(
              "Erro de Validação",
              400,
              bodydata.error.errors.map((error) => `${error.path[0]}: ${error.message}`)
            );
        }

        const user_exist = await findUser(bodydata.data.email);
        if (user_exist) {
          throw new AppError("Este email já está cadastrado!");
        }
        
        const hashedPassword = await hash(bodydata.data.password, 10);
  
        const user = await createUser({
          name: bodydata.data.name,
          email:bodydata.data.email,
          password: hashedPassword 
        } as createUserDTO);
        
        return response.status(201).json({ message: "Cadastro concluido com sucesso", data: user });
    }
    catch (error) {
        return response.status(400).json({ message: "Cadastro falhou", data: error });
    }
    
}