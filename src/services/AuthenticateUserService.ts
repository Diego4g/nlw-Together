import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs" //permite comparar 2 senhas
import { sign } from "jsonwebtoken" // para gerar o token


interface IAuthenticateRequest {
    email: string;
    password: string;

}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se email existe

        const user = await usersRepositories.findOne({
            email
        })

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        //Se email existir, verificar se senha esta correta

        //No caso devemos comparar a senha criptografada 

        const passwordMatch = await compare(password, user.password); // retorna um boolean; 
        // SEMPRE QUE O RETORNO É UMA PROMISE PRECISAMOS DO AWAIT

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        //Se senha tiver correta, gerar token

        const token = sign({
            email: user.email

        }, "c53f91099a52a78864fa5a617acabac9", {
            subject: user.id,
            expiresIn: "1d" //token tem o tempo de vida de 1 dia
        }); //como o retorno é apenas uma string nao precisamos do await; o segundo parâmetro foi gerado no md5 generator


        return token;

    }

}

export { AuthenticateUserService }