import express from "express"
import { BlogPost } from "../models/blog-post"
import { getBlogPosts } from "../services/db-queries/blog-posts"
import { body, validationResult } from 'express-validator';

const blogController = {
    async addBlog(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, body } = req.body
        const post = new BlogPost(title, body, res.locals.user.userId)
        if (post.insertToDb())
            res.status(200).send(await post.toObject())
        else
            res.status(400).send("an error occurred")
    },

    getBlog(req: express.Request, res: express.Response) {

    },

    async getAllBlogs(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const blogPosts: BlogPost[] = await getBlogPosts()
        res.status(200).send(blogPosts)
    }
}

export default blogController

