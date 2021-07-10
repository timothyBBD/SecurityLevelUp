
import * as http from "http";
import express, { Express } from "express";
import { json, urlencoded } from "body-parser";
import blogRouter from "./routes/blog-router";
import userRouter from "./routes/user-router";

export class Server {
    private readonly _app: Express;

    get app(): Express {
        return this._app;
    }

    private _server!: http.Server;

    get server(): http.Server {
        return this._server;
    }

    constructor() {
        this._app = express();

        this._app.set("port", process.env.PORT || 3000);

        this.configureMiddleware();

        this.configureRoutes();
    }

    public configureRoutes() {
        this.app.use('/user', userRouter)
        this.app.use('/blog', blogRouter)
    }

    public configureMiddleware() {
        // Required for POST requests
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
        this._app.use(cors())

        // CORS
        this.app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
            next();
        });
    }

    public start() {
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("🚀 Server is running on port " + this._app.get("port"));
        });
    }
}