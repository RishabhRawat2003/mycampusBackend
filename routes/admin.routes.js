import { Router } from "express";
import { addAdmin, contactAdminForPackage, login } from "../controllers/adminControllers.js";


const router = Router()

router.route("/add-admin").post(addAdmin)
router.route("/admin-login").post(login)
router.route("/contact-admin").post(contactAdminForPackage)




export default router