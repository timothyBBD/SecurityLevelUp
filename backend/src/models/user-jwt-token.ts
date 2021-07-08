export class UserJwt {
    sub: string
    iss: string = ""
    name: string
    email: string
    admin: boolean

    constructor(id: string, name: string, email: string, admin: boolean=false) {
        this.sub = id
        this.name = name
        this.email = email
        this.admin = admin
    }
}