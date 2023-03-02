import axios from "axios";

export const request = async (method, url, data, headers) => {
    const token = localStorage.getItem('token')
    if (token !== undefined || token !== "") {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                ...headers
            }
        }
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
    return false
}
