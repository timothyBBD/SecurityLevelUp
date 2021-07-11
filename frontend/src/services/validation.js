const passwordCreation = (password) => {
    const hasLowerCase = new RegExp("^(?=.*[a-z])");
    const hasUpperCase = new RegExp("^(?=.*[A-Z])");
    const hasNumber = new RegExp("^(?=.*[0-9])");
    const hasSpecialChar = new RegExp("^(?=.*[!@#$%^&*])");
    const hasEightChars = new RegExp("^(?=.{8,})");

    const passwordChecks = {
        hasLowerCase: hasLowerCase.test(password),
        hasUpperCase: hasUpperCase.test(password),
        hasNumber: hasNumber.test(password),
        hasSpecialChar: hasSpecialChar.test(password),
        hasEightChars: hasEightChars.test(password),
    }
    return passwordChecks;
}

export const validation = {
    passwordCreation
}