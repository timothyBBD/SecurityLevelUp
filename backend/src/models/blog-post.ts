
export class BlogPost {
    private title: string
    private content: string
    private timeCreated: string
    private userId: number

    constructor(title: string, content: string, userId: number, timeCreated: string = Date()) {
        this.title = title
        this.content = content
        this.userId = userId
        this.timeCreated = timeCreated
    }

    public getTitle(): string{
        return this.title
    }

    public getContent(): string {
        return this.content
    }

    public getUserId(): number {
        return this.userId
    }

    public getTimeCreated(): string {
        return this.timeCreated
    }

    public insertToDb() {
        
    }

}