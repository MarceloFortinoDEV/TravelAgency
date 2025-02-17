import { Request, Response, NextFunction } from "express";
import { decodeToken, openSessionToken } from "./services/auth-services";

const adminRoutes = ['/delete', '/user']

export const Middleware = async(request: Request, response: Response, next: NextFunction) => {

    const token = request.headers.authorization as string;

    const pathname = request.path;

    if (!token) {
        return response.status(401).json({ message: 'Não autorizado. Token não encontrado.' })
    }

    const validSession = await openSessionToken(token);

    if (!validSession) {
        return response.status(400).json({ message: 'O JWT não é válido.' })
    }

    if (pathname.includes(adminRoutes.toString())) {
        const decodedToken = await decodeToken(token);

        if (decodedToken) {
            const role = decodedToken?.role;

            if (role === 'ADMINISTRATOR') {
                return next();
            }

            return response.status(401).json({ message: 'Não autorizado, é necessário ser um administrador.' })
        }

        return response.status(401).json({ message: 'Não autorizado.' })
    }

    next();
}