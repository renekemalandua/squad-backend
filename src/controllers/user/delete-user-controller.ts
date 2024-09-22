import { Request, Response } from "express";
import { deleteUser, findUser } from "../../models/user-model";
import { AppError } from "../../utils/errors/app-error";

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: Error deleting user
 */

export async function deleteUserController(request: Request, response: Response): Promise<Response> {

    try {
        const {id} = request.params;

        const user = await findUser(Number(id));

        if(!user){
            throw new AppError("usuario não encontrado")
        }
        
        await deleteUser(user.id);

        return response.status(200).json({ message: "Usuario deletado com sucesso"});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao deletar usuario", data: error });
    }
}