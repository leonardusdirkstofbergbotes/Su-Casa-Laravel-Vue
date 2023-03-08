import axios from "axios";
import { useStore } from "vuex";

export const request = async (method, url, data, headers) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
            ...headers
        }
    }

    const tokenValidity = isTokenValid(token);
    if (tokenValidity === true) {

        return await processRequest(method, url, data, config);
    }
    else if (tokenValidity === 'refreshToken') {
        const store = useStore();
        await store.dispatch('refreshToken', config)
            .then(async token => {
                config.headers.Authorization = 'Bearer ' + token;
                return await processRequest(method, url, data, config);
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }
    return false
}
async function processRequest (method, url, data, config) {
    let response = null;
    switch (method) {
        case 'get':
            response = await axios.get(url, config)
            break;
        case 'post':
            response = await axios.post(url, data, config)
            break;
        case 'put':
            response = await axios.put(url, data, config)
            break;
        case 'delete':
            response = await axios.delete(url, config)
            break;
        default:
            break;
    }
    return response
}

function isTokenValid (token) {
    if (token !== undefined || token !== "") {
        const decodedToken = parseJwt(token);

        const userIdLinkedToToken = decodedToken.sub;
        const loggedInUserId = localStorage.getItem('uid');

        if (userIdLinkedToToken != loggedInUserId) {
            return 'invalidUser'
        }

        const expiresAt = decodedToken.exp;
        const currentTime = Math.floor(new Date().getTime()/1000);

        if (currentTime > expiresAt) {
            return 'refreshToken';
        }

        return true;
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
