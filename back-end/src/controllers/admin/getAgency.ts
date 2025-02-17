import { Request, Response } from "express";
import { getAgency } from "../../models/admin/getAgency";

export const getAgencyController = (request: Request, response: Response) => {
    getAgency((error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao buscar.' })
        }

        return response.status(200).json({ result })
    })
}