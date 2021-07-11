import * as crypto from "crypto"
import { encrypt, hashPassword } from "../services/authentication"
import { addUser } from "../services/db-queries"
import { registerUser } from "../services/user-services"

export class User {
    private name: string
    private surname: string
    private email: string
    private userName: string
    private isAdmin: boolean = false
    private verified: boolean = false
    private hashedPassword: string = ""
    private salt: string = ""


    constructor(name: string, surname: string, email: string, userName: string) {
        this.name = name
        this.surname = surname
        this.email = email
        this.userName = userName
    }

    public getName(): string {
        return this.name
    }

    public getSurname(): string {
        return this.surname
    }

    public getEmail(): string {
        return this.email
    }

    public getUserName(): string {
        return this.userName
    }

    public getIsAdmin(): boolean {
        return this.isAdmin
    }

    public getIsVerified(): boolean {
        return this.verified
    }

    public getHashedPassword(): string {
        return this.hashedPassword
    }

    public getSalt(): string {
        return this.salt
    }

    public setName(name: string) {
        this.name = name
    }

    public setSurname(surname: string) {
        this.surname = surname
    }

    public setEmail(email: string) {
        this.email = email
    }

    public setUserName(userName: string) {
        this.userName = userName
    }

    public setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin
    }

    public setVerified(verified: boolean) {
        this.verified = verified
    }

    public async setPassword(password: string) {
        this.hashedPassword = await this.hash(password)
    }

    public insertToDb() {
        if (this.salt != "" && this.hashedPassword != "") {
            registerUser(this)
        }
    }

    private async hash(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // generate random 16 bytes long salt
            let numberOfBytes: string = "16"
            if (process.env.SALT_BYTES != undefined)
                numberOfBytes = process.env.SALT_BYTES
            const salt = crypto.randomBytes(parseInt(numberOfBytes, 10)).toString('hex');
            this.hashedPassword = hashPassword(password, salt);
            this.salt = encrypt(salt);
        })
    }

}