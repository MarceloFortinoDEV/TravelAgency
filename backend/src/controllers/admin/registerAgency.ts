import { Request, Response } from "express";
import { registerAgency } from "../../models/admin/registerAgency";

export const registerAgencyController = (request: Request, response: Response) => {

    const { cnpj, name, socialName, stateRegister, cnpjStatus, foundationDate } = request.body;

    if (!cnpj || !name || !socialName || !stateRegister || !cnpjStatus || !foundationDate) {

        console.log('Erro de dados')

        return response.status(400).json({ message: 'Erro ao criar agência, não foram enviados todos os dados.' })
    }

    registerAgency(name, cnpj, socialName, stateRegister, cnpjStatus, foundationDate, (error) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                console.log('já existe')

                return response.status(400).json({ message: `Já existe uma agência com esse cnpj. ${error} ` })
            }

            console.log(`${error} erro qualquer`)
            
            return response.status(500).json({ message: `Erro ao cadastrar agência. ` })
        }

        return response.status(201).json({ message: 'Agência cadastrada com sucesso.' })
    })
}