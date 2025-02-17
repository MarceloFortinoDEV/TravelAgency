import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import { getUser } from "../../utils/getUser";
import { createSessionToken } from "../../services/auth-services";

export const userLoginController = async(request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ message: 'Erro ao buscar usuário, os dados não foram enviados corretamente.' })
    }

    await getUser(email, async(error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao pegar informação do usuário.' })
        }

        if (!result[0].id) {
            return response.status(404).json({ message: 'Usuário não encontrado.' })
        }

        const hashPassword = result[0].password;

        const passwordMatch = await bcrypt.compare(String(password), String(hashPassword));

        if (!passwordMatch) {
            return response.status(401).json({ message: `Senha incorreta, enviada: ${String(password)}, hash: ${hashPassword}, match: ${passwordMatch}` })
        }

        const jwtToken = await createSessionToken({ sub: result[0].id, email: result[0].email, name: result[0].name, role: result[0].role });

        return response.status(200).json({ jwtToken })
    })
};