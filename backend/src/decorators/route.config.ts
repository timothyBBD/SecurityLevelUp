import { Request, Response } from "express";
import server from "../..";

interface RouteConfigProps {
    method: METHOD;
    path: string;
}

enum METHOD {
    GET = 'get',
    POST = 'post'
}

function routeConfig({method, path}: RouteConfigProps): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const response = async (req: Request, res: Response) => {
             try {
                const original = await descriptor.value(req, res);

                 res.status(200).json(original);
            } catch (e) {
                res.status(500).json({
                    message: "Some error occurred",
                    error: e.message,
                    stack: e.stack,
                });
            }
        }

        server.app[method](path, response);
    }
}

export default routeConfig