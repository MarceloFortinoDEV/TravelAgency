import { Router } from "express";
import { getAgencyController } from "../../controllers/admin/getAgency";
import { registerAgencyController } from "../../controllers/admin/registerAgency";
import { getAgencyDetailController } from "../../controllers/admin/getAgencyDetail";
import { updateAgencyController } from "../../controllers/admin/updateAgency";
import { deleteAgencyController } from "../../controllers/admin/deleteAgency";

const router = Router()

router.get('/', getAgencyController)

router.post('/create', registerAgencyController)

router.put('/update', updateAgencyController)

router.delete('/delete/:id', deleteAgencyController)

router.get('/details/:id', getAgencyDetailController)

export default router;