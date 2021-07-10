import express from "express"
import { BlogPost } from "../models/blog-post"

const blogController = {
    addBlog(req: express.Request, res: express.Response) {
        const { title, content } = req.body
        const post = new BlogPost(title, content, 1)
        post.insertToDb()
    },

    getBlog(req: express.Request, res: express.Response) {

    },

    getAllBlogs(req: express.Request, res: express.Response) {

    }
}

export default blogController