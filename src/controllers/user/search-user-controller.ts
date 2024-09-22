import { Request, Response } from "express";
import { searchUser } from "../../models/user-model";

/**
 * @swagger
 * /users/search/{name}:
 *   get:
 *     summary: Retrieves a user array by name
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
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: The user data
 *       404:
 *         description: Users not found
 */

export async function searchUserController(request: Request, response: Response): Promise<Response> {

    try {
        const {name} = request.params;

        const users = await searchUser(name);
        
        return response.status(200).json({ data: users});
    } catch (error) {
        return response.status(404).json({ message: "Erro ao buscar usuario", data: error });
    }
}