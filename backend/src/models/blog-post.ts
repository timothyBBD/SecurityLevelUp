import { addBlogPost } from "../services/db-queries/blog-posts"
import { query } from "../services/db-queries/generic-query-service"

export class BlogPost {
    private title: string
    private body: string
    private timeCreated: string
    private userId: number

    constructor(title: string, body: string, userId: number, timeCreated: string = Date()) {
        this.title = title
        this.body = body
        this.userId = userId
        this.timeCreated = timeCreated
    }

    public getTitle(): string{
        return this.title
    }

    public getContent(): string {
        return this.body
    }

    public getUserId(): number {
        return this.userId
    }

    public getTimeCreated(): string {
        return this.timeCreated
    }

    public insertToDb() {
        try {
            addBlogPost(this)
        } catch (e) {
            return false
        }
        return true        
    }

    public async toObject() {
        const { user_name } = ( await query("SELECT user_name FROM users WHERE id = ?", this.userId))[0]
        return {
            "title": this.title,
            "body": this.body,
            "username": user_name,
            "created": this.timeCreated
        }
    }

}