import { Request, Response, NextFunction } from "express"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    //verificar se usuário é admin

    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRepositories.findOne(user_id);


    //se o usuário for admin:
    if (admin) {
        return next(); // continue a rota
    }// se entrar no if ele nao prossegue

    //se não retorne 401 (401 = não autorizado)
    return response.status(401).json({
        error: "Unauthorized",
    })
}