import axios from "axios";
import jwt_decode from "jwt-decode";
// export * as constants from '../constants';


export const constants = {
    URI: {
        HOST: 'http://localhost:3000/',
        USER: 'user/'
    }
};

const API = {
    post: (path, body) => { return axios.post(constants.URI.HOST + path, body) }
}

const request = {
    user: {
        login: (email, username, password) => {

            console.log('loign');

            API.post(constants.URI.USER, {email, username, password})
            .then((response) => {
                var decoded = jwt_decode(response.data); 

                console.log('decoded', decoded);

                localStorage.setItem('token', decoded);
            });
        }    
    }
}

export default request;