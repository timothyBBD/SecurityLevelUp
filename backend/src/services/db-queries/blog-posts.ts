import { BlogPost } from '../../models/blog-post';
import { query } from './generic-query-service';




export const addBlogPost = async (blog: BlogPost) => {
    console.log(blog)
    await query('CALL sp_add_blog_post(?,?,?)', blog.getTitle(), blog.getContent(), blog.getUserId());
};

export const getBlogPosts = async () => {

    const posts: BlogPost[] = await query('SELECT * FROM blog_posts_view');
    return posts;
};