import { hash } from '../services/hash';

const login = async (username, password) => {
    const passwordHash = await hash(password);

    //Api Login

    return false;
};

const register = async (username, email, password) => {
    const passwordHash = await hash(password);

    //Api Register
    return true;
};

export const loginController = {
    login,
    register
};