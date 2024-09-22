import { Request, Response } from "express";
import { findUser } from "../../models/user-model";

/**
 * @swagger
 * /users/find/{id}:
 *   get:
 *     summary: Retrieves a user by ID
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
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: The user data
 *       404:
 *         description: User not found
 */

export async function findUserController(request: Request, response: Response): Promise<Response> {

    try {
        const {id} = request.params;

        const user = await findUser(Number(id));
        
        return response.status(200).json({ data: user});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar usuario", data: error });
    }
}