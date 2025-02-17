import { Request, Response } from "express";
import { updateUser } from "../../../models/admin/users/updateUser";

export const updateUserController = (request: Request, response: Response) => {
    const { id, name, role } = request.body;

    if (!name || !name || !role) {
        return response.status(400).json({ message: `Erro ao criar usuário, não foram enviados todos os dados.` })
    }

    if (role != 'ADMINISTRATOR' && role != 'ANALIST') {
        return response.status(400).json({ message: `Erro ao criar usuário, não foram enviados dados corretos.` })
    }

    updateUser(id, name, role, (error: any) => {
        if (error) {
            console.log(`(${role}) (${id}) (${name}) ${error}`)
            
            return response.status(500).json({ message: 'Erro ao atualizar usuário.' })
        }

        return response.status(200).json({ message: 'Agência atualizado.' })
    })
}