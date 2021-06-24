import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        //verificando se o usuário nao esta enviando para ele mesmo
        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExist = await usersRepositories.findOne(user_receiver) // o findOne ja faz o papel do "where"

        //verificando se o usuário que esta recebendo é um usuário válido
        if (!userReceiverExist) {
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment

    }
}

export { CreateComplimentService }