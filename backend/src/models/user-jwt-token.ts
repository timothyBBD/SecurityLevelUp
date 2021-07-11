export class UserJwt {
    sub: string
    iss: string = ""
    email: string
    admin: boolean

    constructor(username:string, email: string, admin: boolean=false) {
        this.sub = username
        this.email = email
        this.admin = admin
    }
}