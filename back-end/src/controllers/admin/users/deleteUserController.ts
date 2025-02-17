import { Request, Response } from 'express';
import { deleteUser } from '../../../models/admin/users/deleteUser';

export const deleteUserController = (request: Request, response: Response) => {
    const { id } = request.params;

    deleteUser(id, (error) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao excluir usuário.' })
        }

        return response.status(200).json({ message: 'Usuário excluido com sucesso!' })
    })
}