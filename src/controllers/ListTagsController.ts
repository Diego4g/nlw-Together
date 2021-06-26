import { Request, Response } from "express"
import { ListTagsService } from "../services/ListTagsService"

class ListTagsController {

    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();
        // tags = tags.map(tag => ( { ...tag, nameCustom: `#${tag.name}` })), porem vamos utilizar a biblioteca(lembra de usar let na linha de cima) :  https://github.com/typestack/class-transformer

        return response.json(tags);
    }
}

export { ListTagsController }