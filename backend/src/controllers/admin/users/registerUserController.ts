import { Request, Response } from "express";
import { userAdminRegister } from "../../../models/admin/users/userAdminRegister";

export const registerUserController = (request: Request, response: Response) => {
    const { name, email, password, role } = request.body;

    if (!name || !email || !password || !role) {
        return response.status(400).json({ message: `Erro ao criar usuário, não foram enviados todos os dados.` })
    }

    if (role != 'ADMINISTRATOR' && role != 'ANALIST') {
        return response.status(400).json({ message: `Erro ao criar usuário, não foram enviados dados corretos.` })
    }

    userAdminRegister(name, email, password, role, (error) => {
        if (error) {
            return response.status(500).json({ message: `Erro ao criar usuário.` })
        }

        return response.status(201).json({ message: 'Usuário criado com sucesso.' })
    })
}