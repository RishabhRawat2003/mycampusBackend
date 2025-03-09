import { Router } from "express";
import { addAdmin, login } from "../controllers/adminControllers.js";


const router = Router()

router.route("/add-admin").post(addAdmin)
router.route("/admin-login").post(login)




export default router