// import { requests } from "../../../../../../4_design_patterns/backup/horoscopes-frontend/src/repositories/request";
import request from "../services/requests";

export const postController = {
    getAllPosts: () => {

        // const posts = [
        //     {
        //         title: 'foo',
        //         content: 'foo'
        //     },
        //     {
        //         title: 'foo',
        //         content: 'foo'
        //     }
        // ];

        // return posts;

        return request.blog.get();

    },
    insertPost: (title, content) => {

        return request.blog.add(title, content);
    }
}

