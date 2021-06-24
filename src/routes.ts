import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";


const router = Router();

const createUsersController = new CreateUsersController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users", createUsersController.handle);
router.post("/tags", ensureAdmin, createTagController.handle); // a ordem ensureAdmin(middle) e a createTag importa!!!
router.post("/login", authenticateUserController.handle);
router.post("/compliments", createComplimentController.handle)

export { router }