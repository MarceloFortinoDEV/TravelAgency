import { Request, Response } from "express";
import { getUsers } from "../../../models/admin/users/getUsers";

export const getUsersController = (request: Request, response: Response) => {
    getUsers((error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao buscar.' })
        }

        return response.status(200).json({ result })
    })
}