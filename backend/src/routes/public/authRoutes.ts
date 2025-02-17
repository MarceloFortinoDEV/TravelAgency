import { Router } from "express";
import { userRegisterController } from "../../controllers/public/userRegister";
import { userLoginController } from "../../controllers/public/userLogin";

const router = Router()

router.post('/register', userRegisterController)

router.post('/login', userLoginController)

export default router;