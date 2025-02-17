import { Router } from "express";
import { getUsersController } from "../../controllers/admin/users/getUsersController";
import { Middleware } from "../../middleware";
import { registerUserController } from "../../controllers/admin/users/registerUserController";
import { updateUserController } from "../../controllers/admin/users/updateUser";
import { deleteUserController } from "../../controllers/admin/users/deleteUserController";

const router = Router()

router.get('/', Middleware, getUsersController)

router.post('/create', Middleware, registerUserController)

router.put('/update', Middleware, updateUserController)

router.delete('/delete/:id', Middleware, deleteUserController)

export default router;