import { Server } from './src/server';
import { Request, Response } from "express";

enum METHOD {
    GET = 'get',
    POST = 'post'
}

const server = new Server();

export default server

server.start();
