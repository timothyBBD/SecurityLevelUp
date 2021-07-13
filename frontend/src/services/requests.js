import axios from "axios";
import constants from '../constants';

function getConfig() {
    if (localStorage.getItem('token') === null) {
        return {};
    } else {
        return {
            headers: {
                auth: localStorage.getItem('token'), 
            }
        };
    }
}

const API = {
    post: (path, body) => { return axios.post(constants.URI.HOST + path, body, getConfig()) },
    get: (path) => { return axios.get(constants.URI.HOST + path, getConfig()) }
}

const request = {
    user: {
        login: (username, password) => {

            console.debug('login with: ', username, password);

            return API.post(constants.URI.LOGIN, {username, password});
        },
        register: (username, email, password) => {

            console.debug('register with: ', username, email, password);

            return API.post(constants.URI.REGISTER, {username, email, password});
        }    
    },
    blog: {
        get: () => {
            return API.get(constants.URI.BLOG.GET);
        },
        add: (title, body) => {
            console.debug('add with: ', title, body);
            return API.post(constants.URI.BLOG.ADD, {title, body});
        }
    }
}

export default request;