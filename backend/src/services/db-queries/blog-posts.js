import { query } from './generic-query-service';




export const addBlogPost = async (title, body, userId) => {

    await query('CALL sp_add_blog_post(?,?,?)', title, body, userId);
};

export const getBlogPosts = async () => {

    const posts = await query('SELECT title, body FROM blog_posts_view');
    return posts;
};