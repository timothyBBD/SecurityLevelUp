import { loginUser } from "../services/user-services"

export class UserLogin {
    private userName: string
    private password: string
    private accessToken: string = ""


    constructor(userName: string, password: string) {
        this.userName = userName
        this.password = password
    }

    public getUserName(): string {
        return this.userName
    }

    public getPassword(): string {
        return this.password
    }

    public async login(): Promise<boolean> {
        this.accessToken = await loginUser(this)
        return true
    }

    public getAccessToken(): string {
        return this.accessToken
    }
}