import { hash } from '../services/hash';
import requests from '../services/requests';

const login = async (username, password) => {
    const passwordHash = await hash(password);

    return requests.user.login(username, passwordHash);
};

const register = async (username, email, password) => {
    const passwordHash = await hash(password);

    return requests.user.register(username, email, passwordHash);
};

export const loginController = {
    login,
    register
};