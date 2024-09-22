import { Request, Response } from "express";
import { updateUserSchema } from "../../utils/schemas/user-schema";
import { CustomError } from "../../utils/errors/custom-error";
import { findUser, updateUser } from "../../models/user-model";
import { updateUserDTO } from "../../utils/dto/user-dto";
import { AppError } from "../../utils/errors/app-error";

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: User ID
 *               password:
 *                 type: string
 *                 description: User password
 *         examples:
 *            User:
 *              value:
 *                id: 1
 *                name: "René Kemalandua"
 *                email: "kemalanduar@gmail.com"
 *     responses:
 *       200:
 *         description: password updated successfully
 *       400:
 *         description: Error updating the password
 */

export async function updateUserController(request: Request, response: Response): Promise<Response> {

    try{
        const bodydata = updateUserSchema.safeParse(request.body);
        if(bodydata.error){
            throw new CustomError(
              "Erro de Validação",
              400,
              bodydata.error.errors.map((error) => `${error.path[0]}: ${error.message}`)
            );
        }

        const user_exist = await findUser(bodydata.data.id);
        if (!user_exist) {
          throw new AppError("Usuario não encontrado");
        }
        
  
        await updateUser({
          id: bodydata.data.id,
          name: bodydata.data.name,
          email:bodydata.data.email,
        } as updateUserDTO);
        
        return response.status(200).json({ message: "usuario actualizado com sucesso"});
    }
    catch (error) {
        return response.status(400).json({ message: "Erro ao actualizar o usuario", data: error });
    }
    
}