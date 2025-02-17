import { Request, Response } from "express";
import { updateAgency } from "../../models/admin/updateAgency";

export const updateAgencyController = (request: Request, response: Response) => {
    const { id, name, socialName, cnpj, stateRegister, cnpjStatus, foundationDate } = request.body;

    updateAgency(id, name, socialName, cnpj, stateRegister, cnpjStatus, foundationDate, (error: any) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao atualizar agência.' })
        }

        return response.status(200).json({ message: 'Agência atualizado' })
    })
}