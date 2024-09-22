import { Request, Response } from "express";
import { findUser, updatePassword} from "../../models/user-model";
import { AppError } from "../../utils/errors/app-error";
import { hash } from "bcrypt";

/**
 * @swagger
 * /users/update-password:
 *   put:
 *     summary: Updates a user's password
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
 *     responses:
 *       200:
 *         description: password updated successfully
 *       400:
 *         description: Error updating the password
 */

export async function updatePasswordController(request: Request, response: Response): Promise<Response> {

    try{
        
      const {id, password} = request.body;

        const user_exist = await findUser(id);
        if (!user_exist) {
          throw new AppError("Usuario não encontrado");
        }
        
        const hashedPassword = await hash(password, 10);
  
        await updatePassword(id, hashedPassword);
        
        return response.status(200).json({ message: "palavra actualizada com sucesso"});
    }
    catch (error) {
        return response.status(400).json({ message: "Erro ao actualizar a palavra passe", data: error });
    }
}