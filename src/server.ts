import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json()); // middle 

app.use(router); // middle q injeta rotas

app.use((err: Error, request: Request, response: Response, next: NextFunction) => { //importante colocar depois do app.use(routes)

    if (err instanceof Error) { // tudo q for do throw new cai nesse if
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({ // oq nao for do throw new cai aqui
        status: "error",
        message: "Internal Server Error"
    })
}) // middle de erro (usuário ja existente) ai precisa de 4 parâmetro;

app.listen(3000, () => console.log("Server is running"));