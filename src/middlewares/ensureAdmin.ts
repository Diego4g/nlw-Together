import { Request, Response, NextFunction } from "express"




export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    //verificar se usuário é admin
    const admin = true;

    //se o usuário for admin:
    if (admin) {
        return next(); // continue a rota
    }// se entrar no if ele nao prossegue

    //se não retorne 401 (401 = não autorizado)
    return response.status(401).json({
        error: "Unauthorized",
    })
}