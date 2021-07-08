import express from "express";

const blogRouter = express.Router();

blogRouter.route('/blog').all((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.headers);
    next();
})

blogRouter.route('/blog').post((req: express.Request, res: express.Response) => {

})

blogRouter.route('/blog').get((req: express.Request, res: express.Response) => {

})

export default blogRouter;
