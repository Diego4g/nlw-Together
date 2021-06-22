import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUserController";

const router = Router();

const createUsersController = new CreateUsersController;

router.post("/users", createUsersController.handle);

export { router }