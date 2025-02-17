import { Request, Response } from 'express'
import { deleteAgency } from '../../models/admin/deleteagency';

export const deleteAgencyController = (request: Request, response: Response) => {
    const { id } = request.params;

    deleteAgency(id, (error) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao excluir agência.' })
        }

        return response.status(200).json({ message: 'Agência excluida com sucesso!' })
    })
}