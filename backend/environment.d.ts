declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ENCRYPTION_KEY_PATH: number | PathLike
            JWT_ALGORITHM: Algorithms | undefined
            SALT_ENCRYPTION_KEY: string
            SALT_ENCRYPTION_IV: string
            HASH_ALGORITHM: string
            JWT_VALIDATION_KEY_PATH: number | PathLike
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }