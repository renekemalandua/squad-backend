import { Request, Response } from "express";
import { findUser, updateCover} from "../../models/user-model";
import { AppError } from "../../utils/errors/app-error";
import { CloudinaryProvider } from "../../utils/providers/uploadProvider";

/**
 * @swagger
 * /users/update-cover:
 *   put:
 *     summary: Updates a user's cover photo
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
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: User's cover photo file
 *     responses:
 *       200:
 *         description: Cover photo updated successfully
 *       400:
 *         description: Error updating the cover photo
 */

export async function updateCoverController(request: Request, response: Response): Promise<Response> {

    try{

      const { id } = request.body;
      const file = request.file;
  
      const user_exist = await findUser(Number(id));
      if (!user_exist) {
        throw new AppError("Usuario não encontrado");
      }

      if (!file) {
        throw new AppError("Foto não recebida");
      }

      const folder = "squad/cover"
      const uploader = new CloudinaryProvider()
      const img = await uploader.uploadPhoto(file, folder);
        
      await updateCover(Number(id), img.secure_url);
      return response.status(200).json({ message: "foto actualizada com sucesso"});
    }
    catch (error) {
      return response.status(400).json({ message: "Erro ao actualizar a foto", data: error });
    }
    
}