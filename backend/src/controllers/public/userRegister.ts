import { Request, Response } from "express";
import { userRegister } from "../../models/public/userRegister";

export const userRegisterController = (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ message: `Erro ao criar usuário, não foram enviados todos os dados.` })
    }

    userRegister(name, email, password, (error) => {
        if (error) {
            return response.status(500).json({ message: `Erro ao criar usuário.` })
        }

        return response.status(201).json({ message: 'Usuário criado com sucesso.' })
    })
}