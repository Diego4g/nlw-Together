import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";


const router = Router();

const createUsersController = new CreateUsersController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUsersController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle); // a ordem ensureAdmin(middle) e a createTag importa!!!
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)

export { router }