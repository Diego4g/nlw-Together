import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //Receber o token
    const authtoken = request.headers.authorization;

    // Validar se token está preenchido
    if (!authtoken) {
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {
        // Validar se token é válido
        const { sub } = verify(token, "c53f91099a52a78864fa5a617acabac9") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }

}