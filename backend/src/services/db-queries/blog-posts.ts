import { BlogPost } from '../../models/blog-post';
import { query } from './generic-query-service';




export const addBlogPost = async (blog: BlogPost) => {

    await query('CALL sp_add_blog_post(?,?,?)', blog.getTitle(), blog.getContent(), blog.getUserId());
};

export const getBlogPosts = async () => {

    const posts = await query('SELECT title, body FROM blog_posts_view');
    return posts;
};