import { Algorithm } from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ENCRYPTION_KEY_PATH: number | PathLike
            JWT_ALGORITHM: Algorithm;
            SALT_ENCRYPTION_KEY: string
            SALT_ENCRYPTION_IV: string
            HASH_ALGORITHM: string
            JWT_VALIDATION_KEY_PATH: number | PathLike
            SALT_BYTES: string
            DB_HOST: string
            DB_USER: string
            DB_PASSWORD: string
            DB_DATABASE: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }