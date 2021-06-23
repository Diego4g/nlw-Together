import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";


const router = Router();

const createUsersController = new CreateUsersController();
const createTagController = new CreateTagController();


router.post("/users", createUsersController.handle);
router.post("/tags", ensureAdmin, createTagController.handle); // a ordem ensureAdmin(middle) e a createTag importa!!!

export { router }