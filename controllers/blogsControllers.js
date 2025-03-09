import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addBlog = async (req, res) => {
    const { blogTitle, blogContent } = req.body

    if (!blogTitle || !blogContent || !req.files["image"]) {
        return res.status(401).json({ error: "Title, Category, tag and Image is required" })
    }

    const image = await uploadOnCloudinary(req.files.image[0].path)


    const blog = await Blog.create({
        title: blogTitle,
        content: blogContent,
        image: image.secure_url,
    })

    if (!blog) {
        return res.status(401).json({ error: "Blog not founded" })
    }

    return res
        .status(200)
        .json({ message: "blog created successfully" });
}

// this is to get all blogs
export const getBlogs = async (req, res) => {
    const blog = await Blog.find()

    if (!blog) {
        return res.status(401).json({ error: "Blogs not founded" })
    }

    return res
        .status(200)
        .json({ message: blog });
}

// to delete all blogs
export const deleteAllBlogs = async (req, res) => {
    const blog = await Blog.deleteMany()

    if (!blog) {
        return res.status(401).json({ error: "Blogs not founded" })
    }

    return res
        .status(200)
        .json({ message: "all deleted" });
}

// this is to get single blog
export const getSingleBlog = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(401).json({ error: "Id not founded" })
    }

    const blog = await Blog.findById(
        id
    )

    if (!blog) {
        return res.status(401).json({ error: "Blogs not founded" })
    }

    return res
        .status(200)
        .json({ message: blog });
}

// this is to delete single blog
export const deleteSingleBlog = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(401).json({ error: "Id not founded" })
    }

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
        return res.status(401).json({ error: "Blogs not founded" })
    }

    return res
        .status(200)
        .json({ message: "Blog deleted Successfully" });
}

export const editBlog = async (req, res) => {
    const { blogId, blogTitle, blogContent } = req.body;


    if (!blogId) {
        return res.status(400).json({ error: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    let imageUrl = blog.image;

    // If a new image is uploaded, update it
    if (req.files && req.files.image) {
        const image = await uploadOnCloudinary(req.files.image[0].path);
        imageUrl = image.secure_url;
    }

    // Update blog fields
    blog.title = blogTitle || blog.title;
    blog.content = blogContent || blog.content;
    blog.image = imageUrl;

    await blog.save();

    return res.status(200).json({ message: "Blog updated successfully", blog });
};
