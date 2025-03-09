import { Router } from "express";
import { addBlog, deleteAllBlogs, deleteSingleBlog, editBlog, getBlogs, getSingleBlog } from "../controllers/blogsControllers.js";
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/create-blog").post(upload.fields([{ name: "image", maxCount: 1 }]), addBlog)
router.route("/get-blogs").get(getBlogs)
router.route("/delete-blogs").post(deleteAllBlogs)
router.route("/get-single-blog").post(getSingleBlog)
router.route("/delete-single-blog").post(deleteSingleBlog)
router.route("/edit-blog").post(upload.fields([{ name: "image", maxCount: 1 }]), editBlog)



export default router