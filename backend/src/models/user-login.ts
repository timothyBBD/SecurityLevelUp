
export class UserLogin {
    private userName: string
    private password: string


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
}