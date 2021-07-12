import express from "express";
import blogController from "../controllers/blog-controller";
import { checkIsAdmin } from "../middleware/check-admin";
import { checkJwt } from "../middleware/check-jwt";

const blogRouter = express.Router();

blogRouter.route('/').all((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.headers);
    next();
})

blogRouter.route('/').post([checkJwt, checkIsAdmin], blogController.addBlog)

blogRouter.route('/').get(blogController.getAllBlogs)

export default blogRouter;
