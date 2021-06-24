import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs" // criptografia


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);
        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExist = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExist) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8) // o segundo parâmetro é para saber o tamanho da criptografia

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash, // como o valor do password agora é diferente, fazemos o input com o passwordHash;
        })

        await usersRepository.save(user);
        return user;
    }
}

export { CreateUserService };