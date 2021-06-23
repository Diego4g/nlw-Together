import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"



class CreateTagService {

    async execute(name: string) { // como é somente 1 parâmetro n precisamos utilizar o interface
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error("Incorrect name!");
        }
        //SELECT * FROM TAGS WHERE NAME = "name" isso que o findOne esta fazendo
        const tagAlreadyExists = await tagsRepositories.findOne({
            name,
        });

        if (tagAlreadyExists) {
            throw new Error("Tag already exists!")
        }

        const tag = tagsRepositories.create({
            name,
        });

        await tagsRepositories.save(tag);
        return tag;
    }

}

export { CreateTagService }