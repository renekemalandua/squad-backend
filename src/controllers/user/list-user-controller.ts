import { Request, Response } from "express";
import { listUser } from "../../models/user-model";

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Retrieves a array of all users
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
 *         description: User array retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object[]
 *                   description: all users data
 *       404:
 *         description: User not found
 */

export async function listUserController(request: Request, response: Response): Promise<Response> {

    try {
        const users = await listUser();
        
        return response.status(200).json({ data: users});
    } catch (error) {
        return response.status(400).json({ message: "Erro a listar usuario", data: error });
    }
}