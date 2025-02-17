import { Request, Response } from "express";
import { getAgencyDetail } from "../../models/admin/getAgencyDetail";

export const getAgencyDetailController = (request: Request, response: Response) => {

    const { id } = request.params;

    getAgencyDetail(id, (error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao buscar.' })
        }

        return response.status(200).json({ result })
    })
}