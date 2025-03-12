import { Router } from "express";
import { 
    addPackage, 
    getAllPackages, 
    getPackageById, 
    updatePackage, 
    deletePackage, 
} from "../controllers/packageControllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-package").post(upload.array("images"), addPackage);
router.route("/get-packages").get(getAllPackages);
router.route("/get-single-package/:id").post(getPackageById);
router.route("/delete-single-package/:id").post(deletePackage);
router.route("/edit-package").post(upload.array("images"), updatePackage);

export default router;
